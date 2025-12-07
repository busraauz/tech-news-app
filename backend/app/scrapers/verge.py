from bs4 import BeautifulSoup
import httpx

from app.model.article import Article


BASE = "https://www.theverge.com"
limit = 10

CATEGORIES = {
  "tech": BASE + "/tech",
  "ai-artificial-intelligence": BASE + "/ai-artificial-intelligence",
  "reviews": BASE + "/reviews",
  "science": BASE + "/science",
  "entertainment": BASE + "/entertainment"
}


async def scrape(category: str):
  articles = []
  if not category in CATEGORIES:
    return articles
  async with httpx.AsyncClient(timeout=10.0) as client:
    resp = await client.get(CATEGORIES[category])
    resp.raise_for_status()
  soup = BeautifulSoup(resp.text, "html.parser")

  cards = soup.select("div.duet--content-cards--content-card:not(.duet--content-cards--quick-post)")  # Verge article cards
  for card in cards:
    title_el = card.select_one("a._1lkmsmo0._1lkmsmo4")
    title = title_el.get_text(strip=True) if title_el else None
    url = BASE + title_el["href"] if title_el else None
    description_el=card.select_one("p.duet--article--dangerously-set-cms-markup")
    description = description_el.get_text(strip=True) if description_el else None
    img_el = card.select_one('img')
    img_url = img_el["src"] if img_el else None
    author_el = card.select_one("span._1lldluw2 span span")
    author = author_el.get_text(strip=True) if author_el else None
    time_el = card.select_one("time")
    published_date = time_el["datetime"] if time_el else None
    articles.append({"title": title, "summary": description, "url": url, "image": img_url, "author": author, "published": published_date, "category": category})

  return articles
 
