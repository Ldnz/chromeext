
class NewVk extends BasePlayer {
    play() {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){ AudioPage(document.getElementsByClassName(\'_audio_page_player_play\')[0]).togglePlayerPlay(document.getElementsByClassName(\'_audio_page_player_play\")[0]) };a();", currentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';
        // var code = function () {
        //     var playBtn = document.getElementsByClassName("top_audio_player_play")[0];
        //     if (undefined != playBtn) {
        //         playBtn.click();
        //     }
        // };

        this.exec(code);
    }

    pause() {
        var code = 'var playBtn = document.getElementsByClassName("top_audio_player_play")[0]; if (undefined != playBtn) {playBtn.click();}';

        this._exec(code);
    }

    prev() {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){ap.playPrev();};a();", currentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

        this._exec(code);
    }

    next() {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){ap.playNext();};a();", currentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

        this._exec(code);
    }
}

