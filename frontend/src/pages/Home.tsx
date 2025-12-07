
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../services/article";
import type { Article } from "../utils/type";
import { CATEGORIES } from "../utils/const";
import { ArticleCard } from "../components/ArticleCard";

export const Home = () => {
  const [latest, setLatest] = useState<Article[]>([]);

  // Fetch "tech" as default for homepage feed
  useEffect(() => {
    getArticles("tech").then(setLatest);
  }, []);

  const featured = latest[0];
  const listArticles = latest.slice(1, 7);

  return (
    <div className="p-6 space-y-16 animate-slide-in">

      {/* --------------------- FEATURED SECTION --------------------- */}
      {featured && (
        <Link
          to={`/${featured.category}`}
          className="
            block rounded-xl overflow-hidden shadow-brand-lg 
            bg-card]
            hover:glow-primary transition-brand hover:-translate-y-1
          "
        >
          <div className="relative h-80 w-full">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 gradient-overlay"></div>
          </div>

          <div className="p-6 space-y-3">
            <h1 className="text-3xl font-bold text-gradient-primary leading-tight">
              {featured.title}
            </h1>
            <p className="text-gray-400 text-lg line-clamp-3">
              {featured.summary}
            </p>
          </div>
        </Link>
      )}

      {/* --------------------- CATEGORY GRID --------------------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.url}
            to={`${cat.url}`}
            className="
              p-6 rounded-xl text-center bg-card
              border border-border
              hover:bg-primary
              hover:text-white
              transition-brand hover:glow-primary hover:-translate-y-1
              font-semibold
            "
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* --------------------- LATEST ARTICLES --------------------- */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Latest Tech News</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listArticles.map((a: any) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>

    </div>
  );
}

