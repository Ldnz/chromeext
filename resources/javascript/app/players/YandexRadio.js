
class YandexRadio extends BasePlayer {

    play() {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){externalAPI.togglePause();};a();", currentScriptEl = document.getElementById("ya_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "ya_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

        this._exec(code);
    }

    pause () {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){externalAPI.togglePause();};a();", currentScriptEl = document.getElementById("ya_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "ya_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

        this._exec(code);
    }

    prev () {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){externalAPI.prev();};a();", currentScriptEl = document.getElementById("ya_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "ya_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

        this._exec(code);
    }

    next() {
        var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){externalAPI.next();};a();", currentScriptEl = document.getElementById("ya_audio_player_control");scriptEl.type="text/javascript"; scriptEl.text = code;scriptEl.setAttribute("id", "ya_audio_player_control");if(undefined!=currentScriptEl){currentScriptEl.remove();}document.getElementsByTagName("html")[0].appendChild(scriptEl);';

        this._exec(code);
    }
}

