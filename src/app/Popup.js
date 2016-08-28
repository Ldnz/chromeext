import $ from 'jquery'
import map from 'lodash/map'
import find from 'lodash/find'
import config from 'config'

export default class Popup {
  constructor() {
    this.tabs = [];
    this.menuEl = $('#tab-list');
    this.container = $('.container');
    this.supported = config('supported');
  }

  init() {
    chrome.windows.getAll({ populate: true }, (windows) => {
      windows.forEach((window) => {
        window.tabs.forEach((tab) => {
          this.tabs.push(tab);
        });
      });

      this.createMenu();
    });

    this.bindAppEvents();
    this.buildSettingsPage();
  }

  createMenu() {
    var tabsLength = this.tabs.length,
      supportedTabsCount = 0;

    if (!tabsLength) {
      return false;
    }

    this.tabs.forEach((tab) => {
      if (!this.isSupported(tab)) {
        return;
      }

      var el = this.createMenuElement(tab);
      var player = makePlayer(this.supported, tab);

      this.bindControlEvents(player, el);

      supportedTabsCount++;
    });

    if (!supportedTabsCount) {
      this.showNotFoundSupportedTabsMessage();
    }
  }

  showNotFoundSupportedTabsMessage() {
    $('.not-found').show();
  }

  createMenuElement(tab) {
    var actions = this.getActions(tab),
      playBtnClass = '',
      pauseBtnClass = 'hidden',
      muteBtnClass = 'hidden',
      audible = false;

    if (tab.audible) {
      playBtnClass = 'hidden';
      pauseBtnClass = '';
      muteBtnClass = '';
      audible = true;
    }

    if (tab.mutedInfo.muted) {
      muteBtnClass = 'muted';
    }

    var prevEl = actions.indexOf('prev') > -1 ? '<span class="ico prev-ico"></span>' : '<span class="ico empty-ico"></span>',
      playEl = actions.indexOf('play') > -1 ? '<span class="ico play-ico ' + playBtnClass + '"></span>' : '<span class="ico empty-ico"></span>',
      pauseEl = actions.indexOf('pause') > -1 ? '<span class="ico pause-ico ' + pauseBtnClass + '"></span>' : '<span class="ico empty-ico"></span>',
      nextEl = actions.indexOf('next') > -1 ? '<span class="ico next-ico"></span>' : '<span class="ico empty-ico"></span>',
      muteEl = actions.indexOf('mute') > -1 ? '<span class="ico mute-ico ' + muteBtnClass + '"></span>' : '<span class="ico empty-ico"></span>';

    var el = $('<li>', {
      html: '<img class="tab-ico" src="' + tab.favIconUrl + '" />' +
      '<span class="tab-title">' + tab.title + '</span>' +
      prevEl +
      playEl +
      pauseEl +
      nextEl +
      muteEl
      ,
      'data-tab-id': tab.id,
      'class': audible ? 'tab audible' : 'tab'
    })[0];

    this.menuEl.append(el);

    return el;
  };

  togglePlayPause(el) {
    var playBtn = $(el).find('.play-ico'),
      pauseBtn = $(el).find('.pause-ico'),
      muteBtn = $(el).find('.mute-ico');

    if (playBtn.hasClass('hidden')) {
      playBtn.removeClass('hidden');
      pauseBtn.addClass('hidden');
      $(el).removeClass('audible');
      muteBtn.addClass('hidden');
    } else if (pauseBtn.hasClass('hidden')) {
      pauseBtn.removeClass('hidden');
      playBtn.addClass('hidden');
      $(el).addClass('audible');
      muteBtn.removeClass('hidden');
    }
  }

  toggleMute(el) {
    var muteBtn = $(el).find('.mute-ico');

    if (muteBtn.hasClass('muted')) {
      muteBtn.removeClass('muted');
    } else {
      muteBtn.addClass('muted');
    }
  }

  isSupported(tab) {
    var isSupported = false;

    for (var item in this.supported) {
      if (tab.url.indexOf(item) > -1) {
        isSupported = true;

        break;
      }
    }

    return isSupported;
  }

  getActions(tab) {
    var actions = null;

    for (var item in this.supported) {
      if (tab.url.indexOf(item) > -1) {
        actions = this.supported[item]['actions'];
        break;
      }
    }

    return actions;
  }

  setActiveTab(tabId) {
    chrome.tabs.get(tabId, (tab) => {
      chrome.tabs.update(tab.id, { selected: true });
      chrome.windows.update(tab.windowId, { focused: true });
    });

  }

  bindControlEvents(player, el) {
    var self = this;

    $(el).find('.play-ico').on('click', () => {
      player.play();
      self.togglePlayPause(el);
    });
    $(el).find('.pause-ico').on('click', () => {
      player.pause();
      self.togglePlayPause(el);
    });
    $(el).find('.prev-ico').on('click', () => {
      player.prev();
    });
    $(el).find('.next-ico').on('click', () => {
      player.next();
    });
    $(el).find('.mute-ico').on('click', () => {
      player.mute();
      self.toggleMute(el);
    });
    $(el).find('.tab-title').on('click', () => {
      this.setActiveTab($(el).data('tab-id'));
    });
  };

  buildSettingsPage() {
    $("#go-to-tab").prop("checked", config('enableTabTransition'));
  }

  bindAppEvents() {
    $(".settings-ico").click(() => {
      var appHeight = this.container.find('#app').height();
      this.container.find('#settings').css('height', appHeight);
      this.container.animate({ scrollLeft: this.container.width() }, 400);
    });

    $(".go-back").click(() => {
      this.container.animate({ scrollLeft: "-" + this.container.width() }, 400);
    });
  }
}

var makePlayer = function (supported, tab) {
  for (var item in supported) {
    if (tab.url.indexOf(item) > -1) {
      var Player = supported[item]['class'];
      break;
    }
  }

  return new Player(tab);
};
