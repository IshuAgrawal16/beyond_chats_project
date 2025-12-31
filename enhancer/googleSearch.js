const axios = require('axios');

module.exports = async (title) => {
  const res = await axios.get(
    `https://serpapi.com/search.json?q=${title}&api_key=${process.env.SERP_API_KEY}`
  );

  return res.data.organic_results
    .filter(r => r.link.includes('blog') || r.link.includes('medium'))
    .slice(0, 2)
    .map(r => r.link);
};
