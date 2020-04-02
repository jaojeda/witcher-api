const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeCharacterInfo = (name) => {
  return request.get(`https://witcher.fandom.com/wiki/${name}`)
    .then(res => parse(res.text))
    .then(html => {
      
      let image = html.querySelectorAll('.pi-image-thumbnail').length ? html.querySelectorAll('.pi-image-thumbnail')[0].rawAttrs.split('"')[1] : null;
      if(!image) {
        image = html.querySelector('.thumbimage') ? html.querySelector('.thumbimage').rawAttrs.split('"')[1] : null;
      }

      const info = {};
      info.name = name;

      info.image = image;
      return info;
    })
    .catch(() => console.log('scrape error', name));
};

scrapeCharacterInfo('Geralt_of_Rivia')
  .then(res => console.log(res));

module.exports = {
  scrapeCharacterInfo
};
