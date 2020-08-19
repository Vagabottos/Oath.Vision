const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');
const webp = require('imagemin-webp');

const init = async () => {
  await imagemin([
    'src/assets/spritesheet/**/*.png'
  ], {
    destination: 'src/assets/spritesheet',
    plugins: [
      pngquant({ 
        quality: [0.1, 0.2] 
      }),
      webp({
        quality: 40
      })
    ]
  });

};

init();