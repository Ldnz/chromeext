
	class App {
		constructor() {
			this.tabs = null;
			this.menuEl = $('#tab-list');
			this.supported = config('supported');
		}

		init() {
			var self = this;

			chrome.tabs.query({active:false}, function (tabs) {
				self.tabs = tabs;

				self.createMenu();
			});
		}

		createMenu() {
			var tabsLength = this.tabs.length;

			if (!tabsLength) {
				return false;
			}

			for (var i = 0; i < tabsLength; i++) {
				var tab  = this.tabs[i];

				if (!this.isSupported(tab)) {
					continue;
				}

				var el = this.createMenuElement(tab);
				var player = makePlayer(this.supported, tab);

				this.bindControlEvents(player, el);
			}
		}

		createMenuElement(tab) {
			var actions = this.getActions(tab),
				playBtnClass = '',
				pauseBtnClass = 'hidden';

			if (tab.audible) {
				playBtnClass = 'hidden';
				pauseBtnClass = '';
			}

			var prevEl = actions.indexOf('prev') > -1 ? '<span class="prev-ico"></span>' : '<span class="empty-ico"></span>',
				playEl = actions.indexOf('play') > -1 ? '<span class="play-ico ' + playBtnClass + '"></span>' : '<span class="empty-ico"></span>',
				pauseEl = actions.indexOf('pause') > -1 ? '<span class="pause-ico ' + pauseBtnClass + '">' : '<span class="empty-ico"></span>',
				nextEl = actions.indexOf('next') > -1 ? '</span><span class="next-ico"></span>' : '<span class="empty-ico"></span>';

			var el = $('<li>', {
				html:'<img class="tab-ico" src="' + tab.favIconUrl + '" />' +
					'<span class="tab-title">' + tab.title + '</span>' +
					prevEl +
					playEl +
					pauseEl +
					nextEl
				,
				'data-tab-id' : tab.id,
				'class' : 'tab'
			})[0];

			this.menuEl.append(el);

			return el;
		};

		togglePlayPause(el) {
			var playBtn = $(el).find('.play-ico'),
				pauseBtn = $(el).find('.pause-ico');

			if (playBtn.hasClass('hidden')) {
				playBtn.removeClass('hidden');
				pauseBtn.addClass('hidden');
			} else if (pauseBtn.hasClass('hidden')) {
				pauseBtn.removeClass('hidden');
				playBtn.addClass('hidden');
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

		bindControlEvents(player, el) {
			var self = this;

			$(el).find('.play-ico').on('click', function () {
				player.play();
				self.togglePlayPause(el);
			});
			$(el).find('.pause-ico').on('click', function () {
				player.pause();
				self.togglePlayPause(el);
			});
			$(el).find('.prev-ico').on('click', function () {
				player.prev();
			});
			$(el).find('.next-ico').on('click', function () {
				player.next();
			});
		};
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

	$(document).ready(function () {
		var app = new App();
		app.init();
	});