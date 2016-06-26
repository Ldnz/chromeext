
class YoutubePlayer extends BasePlayer {

    play() {
        var code = 'var el = document.getElementsByClassName("ytp-play-button")[0];if (undefined != el){el.click();}';

        this._exec(code);
    };

    pause() {
        var code = 'var el = document.getElementsByClassName("ytp-play-button")[0];if (undefined != el){el.click();}';

        this._exec(code);
    };

    prev() {
        var code = 'var el = document.getElementsByClassName("ytp-prev-button")[0];if (undefined != el){el.click();}';

        this._exec(code);
    };

    next() {
        var code = 'var el = document.getElementsByClassName("ytp-next-button")[0];if (undefined != el){el.click();}';

        this._exec(code);
    };
}
