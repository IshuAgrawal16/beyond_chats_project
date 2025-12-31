# BeyondChats Article Scraper & AI Content Enhancer

This project is a **full-stack application** that scrapes blog articles from **BeyondChats**, stores them in a database, enhances them using **AI (LLM)** based on top-ranking Google articles, and displays both original and enhanced versions in a **React frontend**.

The project is divided into **three phases**:
1. Scraping & CRUD APIs
2. AI-based content enhancement
3. Frontend article display

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Axios
- Cheerio (HTML scraping)
- SerpAPI (Google Search)
- OpenAI API (LLM)

### Frontend
- React (Vite)
- CSS (custom responsive styling)

---

## 📂 Project Structure

beyond_chats_project/
│
├── backend/
│ ├── src/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── scraper/
│ │ ├── server.js
│ │
│ ├── enhancer/
│ │ ├── index.js
│ │ ├── googleSearch.js
│ │ ├── scrapeExternal.js
│ │ ├── llm.js
│ │
│ ├── .env.example
│ └── package.json
│
├── frontend/
│ ├── src/
│ ├── index.css
│ ├── App.css
│ └── package.json
│
├── .gitignore
└── README.md

---

## ✨ Features

- Scrapes the **5 oldest BeyondChats blog articles**
- Stores articles in MongoDB
- Full CRUD APIs for articles
- Searches Google for related high-ranking articles
- Scrapes external content
- Enhances articles using an LLM
- Adds references to enhanced articles
- Prevents duplicate enhancement
- Responsive frontend UI for viewing articles

---

## 🔧 Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repo-url>
cd beyond_chats_project
2️⃣ Backend Setup
cd backend
npm install
