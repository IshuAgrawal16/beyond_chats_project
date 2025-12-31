const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  source_url: String,
  updated_from_llm: { type: Boolean, default: false },
  reference_links: [String],
  status: { type: String, default: 'original' }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
