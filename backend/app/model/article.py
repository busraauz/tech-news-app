from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String

from app.core.db import Base

class Article(Base):
    __tablename__ = "article"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String)
    summary = Column(String)
    author = Column(String)
    published = Column(String)
    image = Column(String)
    category = Column(String)
    scraped_at = Column(DateTime, default=lambda: datetime.now(datetime.timezone.utc))
