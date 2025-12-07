from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from app.core.db import SessionLocal, CACHE_TTL
from app.model.article import Article
from app.scrapers.verge import scrape


router = APIRouter(prefix="/news", tags=["News"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_annotation = Annotated[Session, Depends(get_db)]
@router.get('/{category}')
async def get_news(db: db_annotation, category: str):
  expiry_time = datetime.now(timezone.utc) - timedelta(seconds=CACHE_TTL)
  
  fresh_articles = db.query(Article).filter(Article.category == category, Article.scraped_at < expiry_time).all()
  if fresh_articles:
    return fresh_articles

  db.query(Article).filter(Article.category == category).delete()
  db.commit()

  scraped_articles = await scrape(category)
  for article in scraped_articles:
      article['category'] = category
      article['scraped_at'] = datetime.now(timezone.utc)
      model = Article(**article)
      db.add(model)
  db.commit()

  return db.query(Article).filter(Article.category == category).all()
  