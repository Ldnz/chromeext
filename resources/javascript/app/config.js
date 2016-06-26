
function config(name = null) {
    var config = {
        'supported': {
            'music.yandex': {
                'class': YandexMusic,
                'actions': ['play', 'pause', 'prev', 'next']
            },
            'radio.yandex': {
                'class': YandexRadio,
                'actions': ['play', 'pause', 'next']
            },
            'new.vk.com' : {
                'class': NewVk,
                'actions': ['play', 'pause', 'prev', 'next']
            },
            'vk.com' : {
                'class': Vk,
                'actions': ['play', 'pause', 'prev', 'next']
            },
            'youtube.com' : {
                'class': YoutubePlayer,
                'actions': ['play', 'pause', 'next']
            }
        }
    };

    return name ? config[name] : config;
}