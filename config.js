const _CONFIG = {
  title: "Click Target Game",
  url: "",
  description: "",
  deviceOrientation: "landscape",

  imageLoader: {
    background: "https://labs.phaser.io/assets/skies/space3.png",
    target: "https://labs.phaser.io/assets/sprites/red_ball.png"
  },

  soundsLoader: {
    background: "https://labs.phaser.io/assets/audio/tech.mp3"
  },

  libLoader: {},

  deviceOrientationSizes: {
    landscape: {
      height: 720,
      width: 1280
    },
    portrait: {
      height: 1280,
      width: 720
    }
  },

  phaserUrl: "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js",
  phaserVersion: "3.80.1",

  orientationSizes: {
    landscape: {
      width: 1280,
      height: 720
    },
    portrait: {
      width: 720,
      height: 1280
    }
  },

  mobile_portrait: false,
  orientation: "landscape",
  audioLoader: {}
};