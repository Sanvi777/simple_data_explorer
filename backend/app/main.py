from fastapi import FastAPI, Depends, Query
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import or_
from pydantic import BaseModel
from typing import Optional
from faker import Faker
import random

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, index=True)
    company = Column(String, index=True)
    department = Column(String, index=True)
    salary = Column(Float)
    phone = Column(String)

# Pydantic schemas
class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    company: str
    department: str
    salary: float
    phone: str

    class Config:
        from_attributes = True

class UsersResponse(BaseModel):
    users: list[UserResponse]
    total: int
    page: int
    size: int
    total_pages: int

# Create tables
Base.metadata.create_all(bind=engine)

# Seed data
def seed_data():
    db = SessionLocal()
    if db.query(User).count() == 0:
        fake = Faker()
        departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "IT"]
        
        for _ in range(100):
            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                company=fake.company(),
                department=random.choice(departments),
                salary=round(random.uniform(30000, 120000), 2),
                phone=fake.phone_number()
            )
            db.add(user)
        db.commit()
    db.close()

# FastAPI app
app = FastAPI(title="User Management API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users", response_model=UsersResponse)
def get_users(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    sort_by: str = Query("id"),
    sort_order: str = Query("asc")
):
    # Seed data on first request
    if db.query(User).count() == 0:
        seed_data()
    
    query = db.query(User)
    
    # Search
    if search:
        query = query.filter(
            or_(
                User.first_name.ilike(f"%{search}%"),
                User.last_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.company.ilike(f"%{search}%"),
                User.department.ilike(f"%{search}%")
            )
        )
    
    # Sorting
    if hasattr(User, sort_by):
        if sort_order == "desc":
            query = query.order_by(getattr(User, sort_by).desc())
        else:
            query = query.order_by(getattr(User, sort_by))
    
    total = query.count()
    users = query.offset((page - 1) * size).limit(size).all()
    
    return {
        "users": users,
        "total": total,
        "page": page,
        "size": size,
        "total_pages": (total + size - 1) // size
    }

@app.get("/")
def root():
    return {"message": "User Management API"}

# Seed on startup
@app.on_event("startup")
def on_startup():
    seed_data()