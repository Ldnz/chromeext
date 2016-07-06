import BasePlayer from './BasePlayer'

export default class PlayGoogle extends BasePlayer {

  play() {
    var code = 'var el = document.getElementById("player-bar-play-pause"); console.log(el); if (undefined != el){el.click();}';

    this._exec(code);
  };

  pause() {
    var code = 'var el = document.getElementById("player-bar-play-pause"); if (undefined != el){el.click();}';

    this._exec(code);
  };

  next() {
    var code = 'var el = document.getElementById("player-bar-forward"); if (undefined != el){el.click();}';

    this._exec(code);
  }

  prev() {
    var code = 'var el = document.getElementById("player-bar-rewind"); if (undefined != el){el.click();}';

    this._exec(code);
  }
}
