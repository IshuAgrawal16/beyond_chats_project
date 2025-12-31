const OpenAI = require('openai');
const openai = new OpenAI();

module.exports = async (original, refs) => {
  const prompt = `
Rewrite and enhance this article using the structure and quality of reference articles.

Original:
${original}

Reference 1:
${refs[0]}

Reference 2:
${refs[1]}

Return improved HTML content.
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }]
  });

  return res.choices[0].message.content;
};
