(function MutePopup() {
    self = this;
   

    self.config = {
        'https://music.yandex.by'   : getMuteYandexMusicCode(),
        'https://radio.yandex.ru'   : getMuteYandexRadioCode(),
        'https://www.youtube.com'   : getMuteYoutubeCode(),
        'https://vk.com/'           : getMuteVkCode()
    };

    self.init = function() {
        
        var stopAll = $('#stop-all')[0];     

        stopAll.addEventListener('click', self.muteAllUnActiveTabs);

        self.createTabListOnMenu(self.vkAudioControlInit);

        // self.vkAudioControlInit();
             
    };

    self.muteAllUnActiveTabs = function () {
        chrome.tabs.query({active:false}, function(tabs) {

            for (var i = 0; i < tabs.length; i++)
            {
                var tabUrl = tabs[i].url,
                    tabId = tabs[i].id,
                    rootUrl;

                for (rootUrl in self.config)
                {
                    if (tabUrl.indexOf(rootUrl) !== -1)
                    {
                        chrome.tabs.executeScript(tabId, {code:
                            self.config[rootUrl.toString()]
                        });
                    }
                }

            }
        });
    };

    self.muteTab = function () {

        var tabId = $(this).data('tab-id');

        chrome.tabs.get(tabId, function(tab) {
           
            var tabUrl = tab.url,                
                rootUrl;

            for (rootUrl in self.config)
            {
                if (tabUrl.indexOf(rootUrl) !== -1)
                {
                    chrome.tabs.executeScript(tabId, {code:
                        self.config[rootUrl.toString()]
                    });
                }
            }
            
        });
    };

    self.createTabListOnMenu = function (callback) {
        var tabList = $('#tab-list')[0];     

        chrome.tabs.query({active:false}, function(tabs) {
            var rootUrl;

            for (var i = 0; i < tabs.length; i++)
            {            
                var tabUrl = tabs[i].url;
                
                for (rootUrl in self.config)
                {
                    if (tabUrl.indexOf(rootUrl) !== -1)
                    {                        
                        if (rootUrl == 'https://vk.com/')
                        {

                            var listEl = $('<li>', {
                                html:'<img class="tab-ico" src="' + tabs[i].favIconUrl + '" />' + 
                                    '<span class="tab-title">' + tabs[i].title.substring(0, 15) + '...</span>' +
                                    '<span class="prev-ico">&nbsp;</span><span class="play-ico"></span><span class="next-ico"></span>'
                                    , 
                                'data-tab-id' : tabs[i].id, 
                                'class' : 'tab'
                            })[0];
                        }
                        else
                        {
                            var listEl = $('<li>', {
                                html:'<img class="tab-ico" src="' + tabs[i].favIconUrl + '" />' + tabs[i].title.substring(0, 15) + '...', 
                                'data-tab-id' : tabs[i].id, 
                                'class' : 'tab'
                            })[0];  
                        }                            

                        // listEl.addEventListener('click', self.muteTab);

                        tabList.appendChild(listEl);     
                    }
                }
            }
        });

        setTimeout(callback, 100);
    };

    self.vkAudioControlInit = function()
    {
        var prevBtns = document.getElementsByClassName('prev-ico'),
            playBtns = $('.play-ico'),
            nextBtns = $('.next-ico');
            
              

        if (undefined == prevBtns)
        {
            return false;
        }


        $(prevBtns).each(function() {
            // console.log(this);
            var tabId = $(this).parent('li').data('tab-id'); 

            this.addEventListener('click', function() { 
                    Vk.prevTrack(tabId);
            });
        });

    };

    self.Vk = {
        prevTrack: function (tabId) {  
            
            var code = 'var scriptEl = document.createElement("script"), code = "var a = function(){audioPlayer.prevTrack();};a();";scriptEl.type="text/javascript"; scriptEl.text = code;document.getElementsByTagName("html")[0].appendChild(scriptEl);'
           

            chrome.tabs.executeScript(tabId, {code:
                code        
            });   
        },

        nextTrack: function() {
            chrome.tabs.executeScript(tabId, {code:
                'audioPlayer.nextTrack();'         
            });
        },

        pauseTrack: function() {
            chrome.tabs.executeScript(tabId, {code:
                'audioPlayer.pauseTrack()'         
            });
        },

        playTrack: function() {
            chrome.tabs.executeScript(tabId, {code:
                'audioPlayer.playTrack()'         
            });
        }



    };
  

    function getMuteYandexMusicCode()
    {
        return 'var el = document.getElementsByClassName("player-controls__btn_pause")[0];if (undefined != el){el.click();}';
    }


    function getMuteYandexRadioCode()
    {
        return 'var body = document.getElementsByClassName("body_state_playing")[0];if (undefined != body){var playBtn = document.getElementsByClassName("player-controls__play")[0];playBtn.click();}';
    }

    function getMuteYoutubeCode()
    {
        return 'var el = document.getElementsByClassName("playing-mode")[0];if (undefined != el){var playBtn = document.getElementsByClassName("ytp-play-button")[0];playBtn.click();}';
    }

    function getMuteVkCode()
    {
        return 'var elMusic = document.getElementsByClassName("playing")[0],elVkVideo = document.getElementsByClassName("pause_button")[0];if (undefined != elMusic){elMusic.click();};if (undefined != elVkVideo){elVkVideo.click();}';
    }

    if (window.addEventListener) 
    {
        window.addEventListener('DOMContentLoaded', self.init, false);
    } 
    else 
    {
        window.attachEvent('onload', self.init);
    }
   


}());