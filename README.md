Full-Stack Simple Data Explorer
📋 Project Overview
A complete full-stack application built with FastAPI backend and Next.js frontend for comprehensive user management. This system demonstrates modern web development practices with a RESTful API, database integration, and a responsive React interface.

🚀 Quick Start
Backend Setup
Navigate to backend directory:

bash
cd backend
Install Python dependencies:

bash
pip install -r requirements.txt
Run the development server:

bash
uvicorn app.main:app --reload --port 8000
Frontend Setup
Navigate to frontend directory:

bash
cd frontend
Install Node.js dependencies:

bash
npm install
Run the development server:

bash
npm run dev


🏗️ System Architecture
Backend (FastAPI)
Framework: FastAPI 0.104.1

Database ORM: SQLAlchemy 2.0.23

Validation: Pydantic 2.5.0

Server: Uvicorn 0.24.0

Testing Data: Faker 19.6.2

Frontend (Next.js)
Framework: Next.js 14.0.3

UI Library: React 18.2.0

HTTP Client: Axios 1.6.0

Language: TypeScript 5.3.3

📁 Project Structure
text
fullstack/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application instance
│   │   ├── models.py            # SQLAlchemy database models
│   │   ├── schemas.py           # Pydantic request/response schemas
│   │   └── database.py          # Database configuration and connection
│   ├── requirements.txt         # Python dependencies
│   └── README.md
└── frontend/
    ├── components/              # React components
    ├── pages/                   # Next.js pages
    ├── services/                # API service layer
    ├── styles/                  # CSS/styling
    ├── package.json             # Node.js dependencies
    └── README.md


🔧 API Endpoints
User Management
GET / - API status check

POST /users/ - Create new user

GET /users/ - List all users (with pagination)

GET /users/{id} - Get user by ID

PUT /users/{id} - Update user

DELETE /users/{id} - Delete user

GET /users/fake/ - Generate test user with fake data

Features
CORS enabled for frontend integration

Input validation with Pydantic

Error handling with proper HTTP status codes

Auto-generated API documentation

Database session management

🗄️ Database Schema
User Model
python
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
🛠️ Development Features
Backend
✅ FastAPI for high-performance API

✅ SQLAlchemy for database operations

✅ Pydantic for data validation

✅ Automatic API documentation

✅ CORS middleware configuration

✅ Faker integration for testing

✅ Type hints throughout the codebase

Frontend
✅ Next.js 14 with App Router

✅ React 18 with hooks

✅ TypeScript for type safety

✅ Axios for API communication

✅ Responsive design

✅ Modern React patterns

📊 API Response Examples
Create User
json
{
  "name": "John Doe",
  "email": "john@example.com"
}
User Response
json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
🔒 Environment Configuration
Backend Environment Variables
Create a .env file in the backend directory:

env
DATABASE_URL=sqlite:///./app.db
SECRET_KEY=your-secret-key
DEBUG=True
Frontend Environment Variables
Create a .env.local file in the frontend directory:

env
NEXT_PUBLIC_API_URL=http://localhost:8000
🧪 Testing
Backend Testing
bash
# Run tests
pytest

# Test specific endpoint
curl http://localhost:8000/users/
Frontend Testing
bash
# Run development server
npm run dev

# Build for production
npm run build
🚀 Deployment
Backend Deployment
Compatible with any ASGI server (Uvicorn, Hypercorn, Daphne)

Docker support available

Environment variable configuration

Frontend Deployment
Vercel (recommended for Next.js)

Netlify

Any static hosting service

📝 Development Guidelines
Code Standards
Backend follows PEP 8 standards

Frontend uses ESLint and Prettier

TypeScript strict mode enabled

Comprehensive error handling

Git Workflow
Feature branches for new development

Pull request reviews required

Semantic commit messages

Regular dependency updates

🤝 Contributing
Fork the repository

Create a feature branch

Make your changes

Add tests if applicable

Submit a pull request

📞 Support
For technical support or questions:

Backend issues: Check FastAPI documentation

Frontend issues: Check Next.js documentation

Project-specific: Review API documentation at /docs

📄 License
This project is developed as a demonstration for full-stack development capabilities.

Built with ❤️ using FastAPI & Next.js
