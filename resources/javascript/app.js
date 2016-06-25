(function app() {

	var App = function () {
		this.tabs = null;
		this.menuEl = $('#tab-list');
		this.supported = {
			'music.yandex' : YmPlayer,
			'vk.com' : VkPlayer,
			'youtube.com' : YoutubePlayer
		};
	};

	App.prototype.init = function () {
		var self = this;

		chrome.tabs.query({active:false}, function (tabs) {
			self.tabs = tabs;

			self.createMenu();
		});
	};

	App.prototype.createMenu = function() {
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
	};

	App.prototype.createMenuElement = function (tab) {
		var playBtnClass = '',
				pauseBtnClass = 'hidden';

		if (tab.audible) {
			playBtnClass = 'hidden';
			pauseBtnClass = '';
		}

		var el = $('<li>', {
			html:'<img class="tab-ico" src="' + tab.favIconUrl + '" />' +
			'<span class="tab-title">' + tab.title + '</span>' +
			'<span class="prev-ico"></span><span class="play-ico ' + playBtnClass + '"></span><span class="pause-ico ' + pauseBtnClass + '"></span><span class="next-ico"></span>'
			,
			'data-tab-id' : tab.id,
			'class' : 'tab'
		})[0];

		this.menuEl.append(el);

		return el;
	};

	App.prototype.togglePlayPause = function (el) {
		var playBtn = $(el).find('.play-ico'),
				pauseBtn = $(el).find('.pause-ico');

		if (playBtn.hasClass('hidden')) {
			playBtn.removeClass('hidden');
			pauseBtn.addClass('hidden');
		} else if (pauseBtn.hasClass('hidden')) {
			pauseBtn.removeClass('hidden');
			playBtn.addClass('hidden');
		}
	};

	App.prototype.isSupported = function (tab) {
		var isSupported = false;

		for (var item in this.supported) {
			if (tab.url.indexOf(item) > -1) {
				isSupported = true;

				break;
			}
		}

		return isSupported;
	};

	App.prototype.bindControlEvents = function (player, el) {
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

	/**
	 *
	 *
	 *
	 * */
	var Player = function (tab) {
		this.tabId = tab.id;

		this._exec = function (code) {
			chrome.tabs.executeScript(this.tabId, { code:
				code
			});
		};
	};
	Player.prototype.play = function () { return false; };
	Player.prototype.pause = function () { return false; };
	Player.prototype.prev = function () { return false; };
	Player.prototype.next = function () { return false; };



	var VkPlayer = function () {
		this.tabId = null;
	};

	VkPlayer.prototype.play = function () {
		//var code = 'var result=false; var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.playTrack();};a();", cuurentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=cuurentScriptEl){cuurentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl); result';
		var code = 'var playBtn = document.getElementById("head_play_btn"); if (undefined != playBtn) {playBtn.click();}';

		this._exec(code);
	};

	VkPlayer.prototype.pause = function () {
		//var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.pauseTrack();};a();", cuurentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=cuurentScriptEl){cuurentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';
		var code = 'var playBtn = document.getElementById("head_play_btn"); if (undefined != playBtn) {playBtn.click();}';

		this._exec(code);
	};

	VkPlayer.prototype.prev = function () {
		var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.prevTrack();};a();", cuurentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=cuurentScriptEl){cuurentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

		this._exec(code);
	};

	VkPlayer.prototype.next = function () {
		var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.nextTrack();};a();", cuurentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=cuurentScriptEl){cuurentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);'

		this._exec(code);
	};

	var YmPlayer = function () {
		this.tabId = null;
	};

	YmPlayer.prototype.play = function () {
		var code = 'var el = document.getElementsByClassName("player-controls__btn_play")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};

	YmPlayer.prototype.pause = function () {
		var code = 'var el = document.getElementsByClassName("player-controls__btn_pause")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};

	YmPlayer.prototype.prev = function () {
		var code = 'var el = document.getElementsByClassName("player-controls__btn_prev")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};

	YmPlayer.prototype.next = function () {
		var code = 'var el = document.getElementsByClassName("player-controls__btn_next")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};


	var YoutubePlayer = function () {
		this.tabId = null;
	};

	YoutubePlayer.prototype.play = function () {
		var code = 'var el = document.getElementsByClassName("ytp-play-button")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};

	YoutubePlayer.prototype.pause = function () {
		var code = 'var el = document.getElementsByClassName("ytp-play-button")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};

	YoutubePlayer.prototype.prev = function () {
		var code = 'var el = document.getElementsByClassName("ytp-prev-button")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};

	YoutubePlayer.prototype.next = function () {
		var code = 'var el = document.getElementsByClassName("ytp-next-button")[0];if (undefined != el){el.click();}';

		this._exec(code);
	};

	var makePlayer = function (supported, tab) {
		for (var item in supported) {
			if (tab.url.indexOf(item) > -1) {
				extend(Player, supported[item]);

				break;
			}
		}

		return new Player(tab);
	};

	var extend = function (Child, Parent) {
		var F = function() { };

		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.superclass = Parent.prototype;
	};


	$(document).ready(function () {
		var app = new App();

		app.init();
	});


}());