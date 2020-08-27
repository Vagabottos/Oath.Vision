
const cardJson = require('../src/assets/json/cards.json');
const worldJson = require('../src/assets/spritesheet/+world.json');

Object.keys(cardJson).forEach((key, i) => {
  if(i > 197) return;

  const keyCheck = key.split('\\').join('');
  const exists = worldJson.frames[`${keyCheck}.png`];
  if(exists) return;

  if(key === 'Squires' || key === 'Homesick') return; // can't find these cards, so not sure if they exist (?)

  console.error(`${keyCheck}.png (${key}) does not exist. Something is wrong.`);
  process.exit(1);
});
