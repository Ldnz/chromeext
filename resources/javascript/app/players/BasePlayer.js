class BasePlayer {
    constructor(tab) {
        this.tab = tab;
        this.muted = tab.mutedInfo.muted;
    }

    _exec(code) {
        code = code.replace();
        chrome.tabs.executeScript(this.tab.id, { code:
            code
        });
    }

    play() { return false; }
    pause() { return false; }
    prev() { return false; }
    next() { return false; }
    mute() {
        chrome.tabs.update(this.tab.id, {
            muted: !this.muted
        });

        this.muted = !this.muted;
    }
}