const exec = require('child_process').execSync;
const fs = require('fs');

const packer = require('spritesheet-js');
const rimraf = require('rimraf');

// clean directory in case it needs it
rimraf.sync('raw-images/site/\+*');

// transform these files to the correct dimensions
exec('gm mogrify -format "formatted.png" -trim -resize 250x160! "raw-images/site/*.png"');

// pack textures
packer(
  'raw-images/site/**/*.formatted.png', 

  { format: 'json', name: '+site', path: 'src/assets/spritesheet/' }, 

  (err) => {
    if(err) {
      console.error('err', err);
  
      // remove formatted images on fail too
      rimraf.sync('raw-images/site/**/*.formatted.png');
  
      process.exit(1);
    }

    // rewrite atlas file
    fs.writeFileSync(
      'src/assets/spritesheet/+site.json',
      fs.readFileSync('src/assets/spritesheet/+site.json', 'utf-8').split('.formatted').join('')
    );

    // remove formatted images
    rimraf.sync('raw-images/site/**/*.formatted.png');
  }
);