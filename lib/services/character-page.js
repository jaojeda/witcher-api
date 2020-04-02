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

      const labels = html.querySelectorAll('.pi-data-label') ? html.querySelectorAll('.pi-data-label').map(label => label.structuredText) : null;
      const values = html.querySelectorAll('div .pi-data-value') ? html.querySelectorAll('div .pi-data-value').map(value => value.structuredText) : null;

      const extraValue = html.querySelector('div .pi-data-value p');
      if(extraValue) extraValue.parentNode.removeChild(extraValue);
      const caption = html.querySelector('.caption');
      if(caption) caption.parentNode.removeChild(caption);

      const description = html.querySelector('div .mw-content-text p') ? html.querySelector('div .mw-content-text p').structuredText : null;

      const allCategories = html.querySelector('div .container').querySelector('ul').querySelectorAll('li') ? html.querySelector('div .container').querySelector('ul').querySelectorAll('li').map(value => value.structuredText) : null;
      const categories = allCategories.filter(category => category !== 'Cleanup' && category !== 'Citations needed' && category !== 'Stubs' && category !== '');

      const info = {};
      info.name = name;

      if(labels && values) {
        for(let i = 0; i < labels.length; i++) {
          if(labels[i] === 'Portrayed by') {
            info.portrayedBy = values[i];
          }
          else {
            info[labels[i].toLowerCase()] = values[i];
          }
        }
      }

      info.image = image;
      info.description = description;
      info.categories = categories;
      return info;
    })
    .catch(() => console.log('scrape error', name));
};

scrapeCharacterInfo('Visenna')
  .then(res => console.log(res));

module.exports = {
  scrapeCharacterInfo
};
