import BasePlayer from './BasePlayer'

export default class YandexMusic extends BasePlayer {
  play() {
    var code = 'var el = document.getElementsByClassName("player-controls__btn_play")[0]; if (undefined != el){el.click();}';

    this._exec(code);
  }

  pause() {
    var code = 'var el = document.getElementsByClassName("player-controls__btn_pause")[0];if (undefined != el){el.click();}';

    this._exec(code);
  }

  prev() {
    var code = 'var el = document.getElementsByClassName("player-controls__btn_prev")[0];if (undefined != el){el.click();}';

    this._exec(code);
  }

  next() {
    var code = 'var el = document.getElementsByClassName("player-controls__btn_next")[0];if (undefined != el){el.click();}';

    this._exec(code);
  }
}