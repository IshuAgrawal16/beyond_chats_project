export default function ArticleCard({ article }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="font-bold">{article.title}</h2>
      <span>{article.status === 'updated' ? 'AI Updated' : 'Original'}</span>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}
