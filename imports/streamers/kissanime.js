import Cheerio from 'cheerio';

export let kissanime = {
  // General data
  id: 'kissanime',
  name: 'KissAnime',
  homepage: 'http://kissanime.ru/',

  // Search page data
  searchCreateUrl: function(query) {
    return 'http://kissanime.ru/Search/Anime?keyword=' + query.replace(/\s/g, '+');
  },
  searchRowSelector: 'table.listing tbody tr',
  searchRowSkips: 2,

  // Search page attribute data
  searchSelectorUrl: 'td a',
  searchAttributeUrl: function(partial) {
    return this.homepage + partial.attr('href');
  },
  searchSelectorName: 'td a',
  searchAttributeName: function(partial) {
    return partial.text().replace(/\(Dub\)$/, '').replace(/\(Sub\)$/, '');
  },
  searchSelectorDescription: 'td',
  searchAttributeDescription: function(partial) {
    return Cheerio.load(partial.attr('title'))('div p').text().replace(/ \.\.\.\n\s*$/, descriptionCutoff);
  },

  // Show page data
  showCheckIfPage: function(page) {
    return page('title').text().cleanEntersAndSpaces().match(/^.* anime \| Watch .* anime online in high quality$/);
  },

  // Show page attribute data
  showSelectorUrl: 'a.bigChar',
  showAttributeUrl: function(partial) {
    return this.homepage + partial.attr('href');
  },
  showSelectorName: 'a.bigChar',
  showAttributeName: function(partial) {
    return partial.text();
  },
  showSelectorAltNames: '.bigBarContainer .barContent div:nth-child(2) p:first-of-type',
  showAttributeAltNames: function(partial) {
    return partial.find('a').map((index, element) => {
      return Cheerio.load(element).text();
    }).get();
  },
  showSelectorDescription: '.bigBarContainer .barContent div:nth-child(2) p:nth-child(7) span',
  showAttributeDescription: function(partial) {
    return partial.text();
  },
};
