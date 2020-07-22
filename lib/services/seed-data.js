// const { scrapeCharacterInfo } = require('./character-page');
const { scrapeNames } = require('./character-names');
const { scrapeCharacterInfo } = require('./character-page');
const { client } = require('../utils/connect');

const queries = [
  'The_Witcher_characters',
  'The_Last_Wish_characters',
  'The_Witcher_2_characters',
  'The_Witcher_3_characters'
];

const getNames = () => {
  return Promise.all(queries.map(query => scrapeNames(`https://witcher.fandom.com/wiki/Category:${query}`)))
    .then(arr => arr.reduce((names, queryResult) => [...names, ...queryResult], []));
};

const seedCharacters = (names) => {
  return Promise.all(names.map(name => {
    return scrapeCharacterInfo(name)
      .then(info => {
        if(info.image) {
          return client.query(`
            INSERT INTO character(name, hair_color, eye_color, race, gender, titles, profession, affiliation, abilities, partners, children, actor, books, image, description, categories)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [info.name, info['hair color'], info['eye color'], info.race, info.gender, info['title(s)'], info.profession, info['affiliation(s)'], info.abilities, info['partner(s)'], info['child(ren)'], info.actor, info.books, info.image, info.description, info.categories]
          );
        }
      });
  }));
};

client.connect()
  .then(() => getNames())
  .then(names => seedCharacters(names))
  .finally(() => client.end())
  .catch(err => console.log(err));
