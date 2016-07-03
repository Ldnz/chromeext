
class Twitch extends BasePlayer {

    play() {
        var code = 'var frameContainer = document.getElementsByClassName("live_frontpage_player_container")[0]; if (undefined != frameContainer) { var frame = frameContainer.getElementsByTagName("iframe")[0]; if (undefined != frame) { var el = frame.contentWindow.document.getElementsByClassName("js-control-play-button")[0] }} else { var el = document.getElementsByClassName("js-control-play-button")[0]; }; if (undefined != el) { el.click(); }';

        this._exec(code);
    };



    pause() {
        var code = 'var frameContainer = document.getElementsByClassName("live_frontpage_player_container")[0]; if (undefined != frameContainer) { var frame = frameContainer.getElementsByTagName("iframe")[0]; if (undefined != frame) { var el = frame.contentWindow.document.getElementsByClassName("js-control-play-button")[0] }} else { var el = document.getElementsByClassName("js-control-play-button")[0]; }; if (undefined != el) { el.click(); }';

        this._exec(code);
    };
}
