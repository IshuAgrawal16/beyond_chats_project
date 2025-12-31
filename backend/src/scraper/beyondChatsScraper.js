const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../models/Article');

const BASE_URL = 'https://beyondchats.com';

async function scrapeBeyondChats() {
  console.log('Scraping BeyondChats blogs...');

  // Fetch last page (older blogs)
  const res = await axios.get(`${BASE_URL}/blogs/?page=15`);
  const $ = cheerio.load(res.data);

  const links = [];

  $('a').each((_, el) => {
    let href = $(el).attr('href');

    if (href && href.startsWith('/blogs/')) {
      // Convert RELATIVE → ABSOLUTE URL
      href = BASE_URL + href;
      links.push(href);
    }
  });

  // Remove duplicates and get 5 oldest
  const oldestFive = [...new Set(links)].slice(-5);

  for (const url of oldestFive) {
    console.log('Scraping:', url);

    const page = await axios.get(url);
    const $$ = cheerio.load(page.data);

    await Article.create({
      title: $$('h1').first().text().trim(),
      content: $$('article').html(),
      source_url: url
    });
  }

  console.log('✅ Successfully scraped 5 oldest articles');
}

module.exports = scrapeBeyondChats;
