Modern Blog Mobile App

A modern, cross-platform mobile blog application built with React Native and Node.js. Features beautiful UI design, secure authentication, and a comprehensive blog management system.

## ✨ Features

### 🎨 UI/UX
- **Modern Design**: Clean, responsive interface with glassmorphism effects
- **Beautiful Gradients**: Purple gradient theme throughout the app
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Cross-Platform**: Works seamlessly on iOS and Android

### 🔐 Authentication
- **Secure Login/Register**: JWT-based authentication system
- **Role-Based Access**: Admin, Author, and Reader roles
- **Session Management**: Secure session handling with refresh tokens
- **Password Security**: Encrypted password storage

### 📝 Blog Features
- **Create Posts**: Rich text editor for blog posts
- **Categories**: Organize posts by categories
- **Comments**: User engagement through comments
- **Tags**: Tag system for better content discovery
- **User Profiles**: Complete user management system

## 🛠️ Tech Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Expo** - Development platform and tools
- **TailwindCSS** - Utility-first CSS framework
- **NativeWind** - TailwindCSS for React Native
- **shadcn/ui** - Modern UI components
- **React Navigation** - Navigation library
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **@expo/vector-icons** - Beautiful icons

### Backend (API)
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for auth
- **bcrypt** - Password hashing
- **Winston** - Logging library

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Expo CLI
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/login-screen-react-native.git
   cd login-screen-react-native
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Mobile Dependencies**
   ```bash
   cd mobile
   npm install
   ```

4. **Database Setup**
   ```bash
   cd backend
   # Configure your database URL in .env
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Environment Variables**
   
   Create `.env` file in backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="24h"
   PORT=3000
   ```

6. **Start Development Servers**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Mobile:
   ```bash
   cd mobile
   npm start
   ```

## 📁 Project Structure

```
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controller/     # API controllers
│   │   ├── model/         # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   ├── prisma/            # Database schema & migrations
│   └── package.json
├── mobile/                 # React Native app
│   ├── src/
│   │   ├── screens/       # App screens
│   │   ├── components/    # Reusable components
│   │   ├── navigation/    # Navigation setup
│   │   ├── utils/         # Helper functions
│   │   └── types/         # TypeScript types
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout

### Blog Management
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/posts/:id/comments` - Get post comments
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Categories & Tags
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag

## 🎨 UI Components

### Screens
- **WelcomeScreen** - App introduction with feature highlights
- **LoginScreen** - User authentication (sign in)
- **RegisterScreen** - User registration with role selection
- **HomeScreen** - Main blog feed (coming soon)

### Components
- **FeatureCard** - Showcase app features
- **Button** - Customizable button component
- **Input** - Form input with icons
- **Select** - Dropdown with custom styling

## 🔧 Development

### Code Style
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

### Database
- **Prisma Studio** - Database GUI
  ```bash
  cd backend
  npx prisma studio
  ```

### Testing
```bash
# Run tests
npm test
