const request = require('superagent');
const { parse } = require('node-html-parser');

const findCharLink = html => html.querySelectorAll('.category-page__member-link');

const findCharNames = objs => {
  const names = objs.map(obj => {
    console.log(obj.childNodes[0].rawText);
    return obj.childNodes[0].rawText;
  });
  return names.filter(name => !name.includes('haracter'));
};

const scrapeNames = url => {
  return request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(names => names.filter(str => !str.includes('&')))
    .then(names => names.filter(str => !str.includes('File')))
    .then(names => names.filter(str => !str.includes('Category')))
    .catch(err => console.log(err));
};

// scrapeNames('https://witcher.fandom.com/wiki/Category:The_Witcher_3_characters')
//   .then(names => console.log(names));


module.exports = {
  scrapeNames
};
