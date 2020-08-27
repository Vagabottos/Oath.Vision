
// requires denizens.csv, relics.csv
// requires denizens folder, relics folder

const fs = require('fs');

if(!fs.existsSync('out')) fs.mkdirSync('out');

const denizenNames = fs.readFileSync('./denizens.csv', 'utf-8').split('\r\n').filter(Boolean).map(x => x.trim());
const relicNames = fs.readFileSync('./relics.csv', 'utf-8').split('\r\n').filter(Boolean).map(x => x.trim());

// copy files with names
denizenNames.forEach((f, i) => {
  if(i === 0 || !f) return;

  const fileMod = i === 1 ? '' : i;
  fs.copyFileSync(`./denizens/denizen${fileMod}.jpg`, `./out/${f}.jpg`);
});

relicNames.forEach((f, i) => {
  if(i === 0 || !f) return;

  const fileMod = i === 1 ? '' : i;
  fs.copyFileSync(`./relics/relic${fileMod}.jpg`, `./out/${f}.jpg`);
});

// generate yml (for rootbot)

const file = denizenNames.slice(1).concat(relicNames.slice(1))
  .map(x => `
- name: ${x}
  image: ${x}
  `)
  .join('');

fs.writeFileSync('./cards.yml', file);