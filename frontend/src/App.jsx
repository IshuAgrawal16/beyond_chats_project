import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './components/ArticleCard';

export default function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(res => setArticles(res.data));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {articles.map(a => <ArticleCard key={a._id} article={a} />)}
    </div>
  );
}
