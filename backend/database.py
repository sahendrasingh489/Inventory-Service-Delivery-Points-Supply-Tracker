from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://project:Sattu%40489@localhost:5432/project"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# 🔥 dependency for DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()