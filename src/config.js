import YandexMusic from './players/YandexMusic'
import YandexRadio from './players/YandexRadio'
import Vk from './players/Vk'
import Youtube from './players/Youtube'
import SoundCloud from './players/SoundCloud'
import PlayGoogle from './players/PlayGoogle'
import Deezer from './players/Deezer'
import Twitch from './players/Twitch'

export const PAUSE = 'pause';
export const PLAY = 'play';
export const PREV = 'prev';
export const NEXT = 'next';
export const MUTE = 'mute';

export default function config(name = null) {
  var config = {
    'enableTabTransition': localStorage.getItem('tab-transition') === 'true',
    'supported': {
      'music.yandex': {
        'class': YandexMusic,
        'actions': [PAUSE, PLAY, NEXT, PREV, MUTE]
      },
      'radio.yandex': {
        'class': YandexRadio,
        'actions': [PAUSE, PLAY, NEXT, MUTE]
      },
      'vk.com': {
        'class': Vk,
        'actions': [PAUSE, PLAY, NEXT, PREV, MUTE]
      },
      'youtube.com': {
        'class': Youtube,
        'actions': [PAUSE, PLAY, NEXT, MUTE]
      },
      'soundcloud.com': {
        'class': SoundCloud,
        'actions': [PAUSE, PLAY, NEXT, PREV, MUTE]
      },
      'twitch.tv': {
        'class': Twitch,
        'actions': [PAUSE, PLAY, MUTE]
      },
      'play.google': {
        'class': PlayGoogle,
        'actions': [PAUSE, PLAY, NEXT, PREV, MUTE]
      },
      'deezer': {
        'class': Deezer,
        'actions': [PAUSE, PLAY, NEXT, PREV, MUTE]
      }
    }
  };

  return name ? config[name] : config;
}