
const cardJson = require('../src/assets/json/cards.json');
const worldJson = require('../src/assets/spritesheet/+world.json');

Object.keys(cardJson).forEach((key, i) => {
  if(i > 197) return;

  const keyCheck = key.toLowerCase().replace(/[^a-z]/g, '');
  const exists = worldJson.frames[`${keyCheck}.png`];
  if(exists) return;

  if(key === 'squires' || key === 'homesick') return; // can't find these cards, so not sure if they exist (?)

  console.error(`${keyCheck}.png (${key}) does not exist. Something is wrong.`);
  process.exit(1);
});
