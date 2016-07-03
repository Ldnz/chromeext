
function config(name = null) {
    var config = {
        'enableTabTransition': localStorage.getItem('tab-transition') === 'true',
        'supported': {
            'music.yandex': {
                'class': YandexMusic,
                'actions': ['play', 'pause', 'prev', 'next', 'mute']
            },
            'radio.yandex': {
                'class': YandexRadio,
                'actions': ['play', 'pause', 'next', 'mute']
            },
            'new.vk.com' : {
                'class': NewVk,
                'actions': ['play', 'pause', 'prev', 'next', 'mute']
            },
            'vk.com' : {
                'class': Vk,
                'actions': ['play', 'pause', 'prev', 'next', 'mute']
            },
            'youtube.com' : {
                'class': YoutubePlayer,
                'actions': ['play', 'pause', 'next', 'mute']
            },
            'soundcloud.com' : {
                'class': SoundCloud,
                'actions': ['play', 'pause', 'prev', 'next', 'mute']
            },
            'twitch.tv' : {
                'class': Twitch,
                'actions': ['play', 'pause', 'mute']
            },
            'play.google' : {
                'class': PlayGoogle,
                'actions': ['play', 'pause', 'prev', 'next', 'mute']
            },
            'deezer' : {
                'class': Deezer,
                'actions': ['play', 'pause', 'prev', 'next', 'mute']
            }
        }
    };

    return name ? config[name] : config;
}