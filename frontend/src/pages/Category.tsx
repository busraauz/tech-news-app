import { Navigate, useParams } from "react-router-dom"
import { CATEGORIES } from "../utils/const";
import { useEffect, useState } from "react";
import { getArticles } from "../services/article";
import { ArticleCard } from "../components/ArticleCard";
import type { Article } from "../utils/type";


export const Category = () => {
  const { category } = useParams()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    if (category) {
      getArticles(category)
        .then((data: Article[]) => setArticles(data))
        .catch((err) => console.error(err));
    }
  }, [category]);

  if (category && !CATEGORIES.find(c => c.url === `/${category}`)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="p-6 animate-slide-in">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}