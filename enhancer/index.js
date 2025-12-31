require('dotenv').config();
const axios = require('axios');
const google = require('./googleSearch');
const scrape = require('./scrapeExternal');
const llm = require('./llm');

const API_BASE = 'http://localhost:5000/api/articles';

(async () => {
  try {
    console.log('🚀 Starting article enhancement process...');

    // Fetch articles from backend
    const response = await axios.get(API_BASE);
    const articles = response.data;

    if (!Array.isArray(articles) || articles.length === 0) {
      console.log('⚠️ No articles found.');
      return;
    }

    for (const article of articles) {
      try {
        const articleTitle = article.title?.trim() || 'Untitled';

        // Skip already enhanced articles
        if (article.updated_from_llm) {
          console.log(`⏭️ Skipping already updated: "${articleTitle}"`);
          continue;
        }

        console.log(`🔎 Processing: "${articleTitle}"`);

        // Safe Google query
        const query = articleTitle;

        // Get top external article links
        const links = await google(query);

        if (!links || links.length === 0) {
          console.log(`⚠️ No external links found for: "${articleTitle}"`);
        }

        // Scrape external articles (ignore failures)
        const externalContents = await Promise.all(
          (links || []).map(async (url) => {
            try {
              return await scrape(url);
            } catch (err) {
              console.error(`❌ Failed to scrape ${url}: ${err.message}`);
              return '';
            }
          })
        );

        // Generate enhanced article using LLM
        const enhancedContent = await llm(
          article.content || '',
          externalContents.filter(Boolean)
        );

        if (!enhancedContent || enhancedContent.length < 50) {
          console.log(`⚠️ LLM returned insufficient content for: "${articleTitle}"`);
          continue;
        }

        // Append references, ensure no duplicate links
        const uniqueLinks = [...new Set(links || [])];
        const finalContent = `
${enhancedContent}

<h3>References</h3>
<ul>
  ${uniqueLinks.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}
</ul>
`;

        // Update article in backend
        await axios.put(`${API_BASE}/${article._id}`, {
          content: finalContent,
          updated_from_llm: true,
          reference_links: uniqueLinks,
          status: 'updated'
        });

        console.log(`✅ Successfully updated: "${articleTitle}"`);
      } catch (articleError) {
        console.error(`❌ Error processing article "${article.title || article._id}":`, articleError.message);
      }
    }

    console.log('🎉 Article enhancement completed.');
  } catch (err) {
    console.error('❌ Fatal error in enhancer:', err.message);
  }
})();
