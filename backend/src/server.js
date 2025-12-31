require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scrapeBeyondChats = require('./scraper/beyondChatsScraper');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ Health check (VERY IMPORTANT)
app.get('/health', (req, res) => {
  res.send('OK');
});

app.use('/api/articles', require('./routes/articleRoutes'));

// ✅ Connect MongoDB FIRST, then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, async () => {
      console.log(`✅ Server running on port ${PORT}`);
      await scrapeBeyondChats();
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
