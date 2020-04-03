// const { scrapeCharacterInfo } = require('./character-page');
const { scrapeNames } = require('./character-names');

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

getNames().then(res => console.log(res));
