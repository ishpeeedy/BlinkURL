# BlinkURL 🔗

<div align="center">

![BlinkURL Banner](https://img.shields.io/badge/BlinkURL-URL_Shortener-blue?style=for-the-badge)
[![Made with Love](https://img.shields.io/badge/Made%20with-🖤-black?style=for-the-badge)](https://github.com/ishpeeedy)

**Transform your long URLs into powerful, trackable short links**

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About

**BlinkURL** is a modern, full-stack URL shortening platform that empowers users to create custom branded links, monitor engagement in real-time, and gain valuable insights into audience behavior. Built with the MERN stack, BlinkURL offers comprehensive analytics, automatic QR code generation, and suspicious traffic detection.

Whether you're a content creator, marketer, or business owner, BlinkURL provides the tools you need to optimize your link sharing strategy and understand your audience better.

---

## ✨ Features

### Core Functionality

- **🔗 URL Shortening**: Transform long URLs into short, memorable links
- **✏️ Custom Aliases**: Create branded short links with custom slugs
- **📱 QR Code Generation**: Automatically generate QR codes for every shortened URL
- **🔒 User Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **📊 Personal Dashboard**: Manage all your shortened URLs in one place

### Advanced Analytics

- **📈 Click Tracking**: Monitor total clicks, unique visitors, and repeat visitors
- **🌍 Geographic Insights**: Track visitor locations by country with GeoIP data
- **💻 Device Analytics**: Breakdown by device type, browser, and operating system
- **⏰ Time-based Analytics**: Analyze click patterns by day, hour, and day of week
- **📊 Trend Analysis**: View click trends over the last 30 and 90 days
- **🚨 Suspicious Traffic Detection**: Identify IPs with unusually high click frequency

### User Experience

- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS
- **⚡ Fast Performance**: Optimized with Vite and React 19
- **📱 Mobile Responsive**: Seamless experience across all devices
- **🎭 Smooth Animations**: Enhanced UX with cipher text animations

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19.1.1
- **Routing**: TanStack Router v1.132.25
- **State Management**: Redux Toolkit v2.2.1
- **UI Components**:
  - Radix UI (Accessible component primitives)
  - shadcn/ui components
  - Lucide React (Icons)
- **Styling**:
  - Tailwind CSS v4.1.13
  - Class Variance Authority
  - Tailwind Merge
- **Data Visualization**: Recharts v3.2.1
- **HTTP Client**: Axios v1.6.8
- **QR Generation**: qrcode v1.5.4
- **Notifications**: Sonner v2.0.7
- **Build Tool**: Vite v5.0

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.18.1
- **Authentication**:
  - JSON Web Tokens (jsonwebtoken v9.0.2)
  - bcryptjs v2.4.3
- **Security**:
  - CORS v2.8.5
  - Cookie Parser v1.4.6
  - HTTP-only cookies
- **Utilities**:
  - nanoid v5.1.5 (Short ID generation)
  - geoip-lite v1.4.10 (Location tracking)
  - ua-parser-js v2.0.5 (Device/browser detection)
- **Logging**: Winston v3.18.3
- **Environment**: dotenv v17.2.2

### Development Tools

- **Linting**: ESLint v9.35.0
- **Code Formatting**: Prettier v3.6.2
- **Dev Server**: Nodemon v3.0.1

---

## 📁 Project Structure

```
BlinkURL/
├── backend/
│   ├── app.js                      # Express app entry point
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── config.js           # Cookie & app configuration
│       │   └── mongodb.config.js   # MongoDB connection setup
│       ├── controllers/
│       │   ├── analytics.controller.js
│       │   ├── auth.controller.js
│       │   ├── short_url.controller.js
│       │   └── user.controller.js
│       ├── dao/                    # Data Access Objects
│       │   ├── click.dao.js
│       │   ├── short_url.js
│       │   └── user.dao.js
│       ├── middleware/
│       │   └── auth.middleware.js  # JWT verification
│       ├── models/
│       │   ├── click.model.js      # Click tracking schema
│       │   ├── short_url.model.js  # URL schema
│       │   └── user.model.js       # User schema
│       ├── routes/
│       │   ├── analytics.routes.js
│       │   ├── auth.routes.js
│       │   ├── short_Url.route.js
│       │   └── user.routes.js
│       ├── services/
│       │   ├── auth.service.js
│       │   └── short_Url.service.js
│       └── utils/
│           ├── analytics.js        # Analytics utilities
│           ├── attachUser.js       # User attachment middleware
│           ├── errorHandler.js     # Global error handler
│           ├── errorUtils.js       # Error utilities
│           ├── getClientIP.js      # IP extraction
│           ├── helper.js           # Helper functions
│           ├── logger.js           # Winston logger
│           └── tryCatchWrapper.js  # Async error wrapper
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── components.json             # shadcn/ui config
│   └── src/
│       ├── main.jsx                # App entry point
│       ├── RootLayout.jsx          # Root layout component
│       ├── index.css               # Global styles
│       ├── api/
│       │   ├── shortUrl.api.js
│       │   └── user.api.js
│       ├── components/
│       │   ├── charts.jsx          # Analytics charts
│       │   ├── CipherText.jsx      # Animated text effect
│       │   ├── Footer.jsx
│       │   ├── LoginForm.jsx
│       │   ├── NavBar.jsx
│       │   ├── RegisterForm.jsx
│       │   ├── UrlAnalytics.jsx    # URL analytics display
│       │   ├── UrlDataTable.jsx    # URL management table
│       │   ├── UrlForm.jsx         # URL shortening form
│       │   ├── UserUrl.jsx
│       │   └── ui/                 # shadcn/ui components
│       ├── hooks/                  # Custom React hooks
│       ├── lib/
│       │   └── utils.js            # Utility functions
│       ├── pages/
│       │   ├── AnalyticsPage.jsx
│       │   ├── AuthPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── HomePage.jsx
│       │   └── NotFound.jsx
│       ├── routing/
│       │   ├── analytics.js
│       │   ├── auth.route.js
│       │   ├── dashboard.js
│       │   ├── homepage.js
│       │   ├── notFound.js
│       │   ├── ProtectedRoute.jsx  # Route protection
│       │   └── routeTree.js        # Route configuration
│       ├── store/
│       │   ├── store.js            # Redux store
│       │   └── slice/
│       │       └── authSlice.js    # Auth state management
│       └── utils/
│           ├── authGuards.js       # Authentication guards
│           ├── axiosInstance.js    # Configured Axios
│           ├── helper.js
│           └── qrGenerator.js      # QR code generation
│
├── package.json                    # Root package.json
└── README.md
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**
- **Git**

### Clone the Repository

```bash
git clone https://github.com/ishpeeedy/BlinkURL.git
cd BlinkURL
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` directory:

```bash
touch .env
```

4. Configure your environment variables (see [Environment Variables](#environment-variables))

5. Start the backend server:

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:3000` (or your configured port).

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:

```bash
touch .env
```

4. Configure your frontend environment variables:

```env
VITE_BACKEND_URL=http://localhost:3000
```

5. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development                    # development | production
PORT=3000                               # Backend server port

# Database
MONGO_URI=mongodb://localhost:27017/blinkurl
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blinkurl

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRE=1h                           # Token expiration time

# Cookie Configuration
COOKIE_DOMAIN=localhost                 # Set to your domain in production

# Application URLs
APP_URL=http://localhost:3000           # Backend URL
FRONTEND_URL=http://localhost:5173      # Frontend URL

# Optional: Logging
LOG_LEVEL=info                          # error | warn | info | debug
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:3000

# Optional: Application URL
VITE_APP_URL=http://localhost:5173
```

### Production Environment Variables

For production deployment, update the following:

**Backend `.env`:**

```env
NODE_ENV=production
PORT=3000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
COOKIE_DOMAIN=.yourdomain.com
APP_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

**Frontend `.env`:**

```env
VITE_BACKEND_URL=https://api.yourdomain.com
VITE_APP_URL=https://yourdomain.com
```

---

## 📖 Usage

### Creating a Short URL

1. **Anonymous Users**:
   - Visit the homepage
   - Enter your long URL in the input field
   - Click "Shorten" to generate a random short URL
   - Download the QR code if needed

2. **Registered Users**:
   - Sign up or log in to your account
   - Navigate to the homepage or dashboard
   - Enter your long URL
   - Optionally provide a custom alias
   - Click "Shorten" to create your custom short URL
   - Access detailed analytics from your dashboard

### Managing URLs

1. Go to the **Dashboard** page
2. View all your shortened URLs in a table format
3. Click on any URL to view detailed analytics
4. Download QR codes for any URL

### Viewing Analytics

1. Navigate to the **Analytics** page for a specific URL
2. View comprehensive metrics:
   - Total clicks, unique visitors, and repeat visitors
   - Geographic distribution by country
   - Device type, browser, and OS breakdown
   - Click patterns by hour of day and day of week
   - 30-day and 90-day trend analysis
   - Suspicious activity detection (high-frequency IPs)

### Using Short URLs

Simply share your short URL: `https://yourdomain.com/abc123`

The system will:

1. Track the click with metadata (IP address, location, device, browser, OS)
2. Detect suspicious patterns (high-frequency IPs)
3. Redirect to the original URL
4. Update analytics in real-time

---

## 📸 Screenshots

hav eto figure out the img hosting for this one

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 👤 Contact

**ishpeeedy**

- GitHub: [@ishpeeedy](https://github.com/ishpeeedy)
- Project Link: [https://github.com/ishpeeedy/BlinkURL](https://github.com/ishpeeedy/BlinkURL)

---

## 🙏 Acknowledgments

- **[MarinatedProject](https://github.com/MarinatedProjects/)** - For bug testing
- **[Aaron Iker](https://codepen.io/aaroniker/pen/pojaBvb/)** - For his Underline Animations
- **[Storyset](https://storyset.com/)** - For the beautiful SVG illustrations used in this project
- **[shadcn/ui](https://ui.shadcn.com/)** - For the amazing UI component library
- **[Radix UI](https://www.radix-ui.com/)** - For accessible component primitives
- **[TanStack](https://tanstack.com/)** - For Router and Query libraries

- All contributors who help improve this project

---

<div align="center">

**Made with 🖤 by [ishpeeedy](https://github.com/ishpeeedy)**

</div>
