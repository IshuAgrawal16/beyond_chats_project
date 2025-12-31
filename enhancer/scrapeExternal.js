const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  return $('article').text() || $('p').text();
};
