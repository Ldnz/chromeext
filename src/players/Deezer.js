import BasePlayer from './BasePlayer'

export default class Deezer extends BasePlayer {

  play() {
    var code = 'var el = document.getElementsByClassName("control-play")[0]; console.log(el); if (undefined != el){el.click();}';

    this._exec(code);
  };

  pause() {
    var code = 'var el = document.getElementsByClassName("control-pause")[0]; if (undefined != el){el.click();}';

    this._exec(code);
  };

  next() {
    var code = 'var el = document.getElementsByClassName("control-next")[0]; if (undefined != el){el.click();}';

    this._exec(code);
  }

  prev() {
    var code = 'var el = document.getElementsByClassName("control-prev")[0]; if (undefined != el){el.click();}';

    this._exec(code);
  }
}
