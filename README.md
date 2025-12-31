# BeyondChats – AI Article Scraping & Enhancement Platform

This project is a full-stack system that:
- Scrapes blog articles from **BeyondChats**
- Stores them in **MongoDB**
- Enhances articles using **Google Search + LLM (OpenAI)**
- Displays both **original and enhanced articles** in a **React frontend**

This repository is submitted as a **technical task project** and demonstrates backend scraping, API design, LLM integration, and frontend rendering.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Axios
- Cheerio
- OpenAI API
- SerpAPI (Google Search)

### Frontend
- React (Vite)
- CSS (custom responsive styling)

---

## 📂 Project Structure

```text
beyond_chats_project/
│
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # CRUD APIs
│   │   ├── scraper/         # BeyondChats scraper
│   │   └── server.js        # Backend entry
│   ├── enhancer/
│   │   ├── googleSearch.js  # Google search logic
│   │   ├── scrapeExternal.js# External article scraper
│   │   ├── llm.js           # OpenAI content enhancer
│   │   └── index.js         # Enhancement runner
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── app.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```


---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

2️⃣ Backend Setup
```bash
cd backend
npm install
```


Create a .env file inside backend/:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```


Start backend server:
```
npm start
```

Expected output:
```
✅ MongoDB connected
✅ Server running on port 5000
```

Backend API:
```
http://localhost:5000/api/articles
```
3️⃣ Run Scraper (Phase 1)

The backend automatically scrapes the 5 oldest articles from:
```
https://beyondchats.com/blogs/
```

And stores them in MongoDB on server start.

4️⃣ Enhancer Setup (Phase 2)
```
cd enhancer
npm install
```

Create .env file inside enhancer/:
```
OPENAI_API_KEY=your_openai_api_key
SERPAPI_KEY=your_serpapi_key
```

Run enhancer script:
```
node index.js
```

“Enhancer is a manual batch script due to free-tier limitations”

This will:

Fetch articles from backend

Search Google using article titles

Scrape top 2 external articles

Enhance content using LLM

Update articles via API

5️⃣ Frontend Setup (Phase 3)
```
cd frontend
npm install
npm run dev
```

Open browser:
```
http://localhost:5173
```
🔁 Data Flow / Architecture Diagram
```
┌─────────────────────┐
│ BeyondChats Blogs   │
│ (Web Scraping)      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Backend (Node.js)   │
│ - Scraper           │
│ - CRUD APIs         │
│ - MongoDB           │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Enhancer Service    │
│ - Google Search     │
│ - External Scraping │
│ - OpenAI LLM        │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Backend APIs        │
│ (Updated Articles) │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ React Frontend      │
│ - Original Articles │
│ - Enhanced Articles │
└─────────────────────┘
```
🔐 Security Practices
```
.env files are ignored using .gitignore
API keys are never committed
.env.example provided for setup reference
```
✅ Features Implemented
```
✔ Web scraping (BeyondChats)
✔ MongoDB storage
✔ Full CRUD APIs
✔ Google Search integration
✔ AI-based article enhancement
✔ Reference citation
✔ Responsive frontend UI
```
🚧 Known Limitations
```
OpenAI rate limits may block multiple enhancements
Google scraping depends on SerpAPI availability
```
👤 Author

Ishu Agrawal
Aspiring AWS Cloud / Full Stack Developer
LinkedIn: https://www.linkedin.com/in/contact-ishu-agrawal/

