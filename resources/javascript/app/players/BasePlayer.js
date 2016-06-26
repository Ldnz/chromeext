class BasePlayer {
    constructor(tab) {
        this.tabId = tab.id;
    }

    _exec(code) {
        code = code.replace();
        chrome.tabs.executeScript(this.tabId, { code:
            code
        });
    }

    play() { return false; }
    pause() { return false; }
    prev() { return false; }
    next() { return false; }
}