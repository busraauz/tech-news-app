import { formatRelativeDate } from "../utils/helper";
import type { Article } from "../utils/type";


export const ArticleCard = ({ article }: { article: Article }) => {
  const publishedDate = formatRelativeDate(article.published)
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        block bg-card
        rounded-xl shadow-brand overflow-hidden
        hover:glow-primary hover:-translate-y-1
        transition-brand hover-pulse
      "
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 gradient-overlay opacity-40"></div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 text-left">

        {/* Title */}
        <h2 className="text-xl font-semibold text-gradient-primary leading-tight">
          {article.title}
        </h2>

        {/* Summary */}
        <p className="text-[14px] text-muted-foreground line-clamp-3">
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
          <span>{article.author}</span>
          <span> {publishedDate} </span>
        </div>
      </div>
    </a>
  );
}
