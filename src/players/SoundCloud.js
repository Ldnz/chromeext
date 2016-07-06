import BasePlayer from './BasePlayer'

export default class SoundCloud extends BasePlayer {

  play() {
    var code = 'var el = document.getElementsByClassName("playControl")[0];if (undefined != el){el.click();}';

    this._exec(code);
  };

  pause() {
    var code = 'var el = document.getElementsByClassName("playControl")[0];if (undefined != el){el.click();}';

    this._exec(code);
  };

  prev() {
    var code = 'var el = document.getElementsByClassName("skipControl__previous")[0];if (undefined != el){el.click();}';

    this._exec(code);
  };

  next() {
    var code = 'var el = document.getElementsByClassName("skipControl__next")[0];if (undefined != el){el.click();}';

    this._exec(code);
  };
}
