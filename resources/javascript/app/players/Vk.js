
class Vk extends BasePlayer {
    play() {
        //var code = 'var result=false; var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.playTrack();};a();", currentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl); result';
        var code = 'var playBtn = document.getElementById("head_play_btn"); if (undefined != playBtn) {playBtn.click();}';

        this._exec(code);
    }

    pause() {
        //var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.pauseTrack();};a();", currentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';
        var code = 'var playBtn = document.getElementById("head_play_btn"); if (undefined != playBtn) {playBtn.click();}';

        this._exec(code);
    }

    prev() {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.prevTrack();};a();", currentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

        this._exec(code);
    }

    next() {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.nextTrack();};a();", currentScriptEl = document.getElementById("vk_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "vk_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);'

        this._exec(code);
    }
}

