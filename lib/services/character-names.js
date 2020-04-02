const request = require('superagent');
const { parse } = require('node-html-parser');

const findCharLink = html => html.querySelectorAll('.category-page__member-link');

const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

const scrapeNames = url => {
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(names => names.filter(str => !str.includes('File:')))
    .catch(err => console.log(err));
};

// scrapeNames('https://witcher.fandom.com/wiki/Category:Baptism_of_Fire_characters')
//   .then(names => console.log(names));


module.exports = {
  scrapeNames
};
