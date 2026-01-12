# BlinkURL

**BlinkURL — shorten URLs with custom slugs, auto-generate QR codes, and track every click with a full analytics dashboard (geography, devices, time patterns, and suspicious traffic detection).**

![React 19](https://img.shields.io/badge/React_19-%23000000.svg?style=for-the-badge&logo=react&logoColor=a985ff)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-%23000000.svg?style=for-the-badge&logo=tanstack&logoColor=a985ff)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-%23000000.svg?style=for-the-badge&logo=redux&logoColor=a985ff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%23000000.svg?style=for-the-badge&logo=tailwind-css&logoColor=a985ff)
![Radix UI](https://img.shields.io/badge/Radix_UI-%23000000.svg?style=for-the-badge&logo=radixui&logoColor=a985ff)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=a985ff)
![Lucide](https://img.shields.io/badge/Lucide-%23000000.svg?style=for-the-badge&logo=lucide&logoColor=a985ff)
![Recharts](https://img.shields.io/badge/Recharts-%23000000.svg?style=for-the-badge&logoColor=a985ff)
![Axios](https://img.shields.io/badge/Axios-%23000000.svg?style=for-the-badge&logo=axios&logoColor=a985ff)
![QR Code](https://img.shields.io/badge/QR_Code-%23000000.svg?style=for-the-badge&logoColor=a985ff)
![Vite](https://img.shields.io/badge/Vite-%23000000.svg?style=for-the-badge&logo=vite&logoColor=a985ff)
![Node.js](https://img.shields.io/badge/Node.js-%23000000.svg?style=for-the-badge&logo=node.js&logoColor=a985ff)
![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=a985ff)
![MongoDB](https://img.shields.io/badge/MongoDB-%23000000.svg?style=for-the-badge&logo=mongodb&logoColor=a985ff)
![Mongoose](https://img.shields.io/badge/Mongoose-%23000000.svg?style=for-the-badge&logo=mongoose&logoColor=a985ff)
![JWT](https://img.shields.io/badge/JWT-%23000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=a985ff)
![bcryptjs](https://img.shields.io/badge/bcryptjs-%23000000.svg?style=for-the-badge&logoColor=a985ff)
![Winston](https://img.shields.io/badge/Winston-%23000000.svg?style=for-the-badge&logo=winston&logoColor=a985ff)
![dotenv](https://img.shields.io/badge/dotenv-%23000000.svg?style=for-the-badge&logo=dotenv&logoColor=a985ff)
![ESLint](https://img.shields.io/badge/ESLint-%23000000.svg?style=for-the-badge&logo=eslint&logoColor=a985ff)
![Prettier](https://img.shields.io/badge/Prettier-%23000000.svg?style=for-the-badge&logo=prettier&logoColor=a985ff)
![Nodemon](https://img.shields.io/badge/Nodemon-%23000000.svg?style=for-the-badge&logo=nodemon&logoColor=a985ff)
![Render](https://img.shields.io/badge/Render-%23000000.svg?style=for-the-badge&logo=render&logoColor=a985ff)

<center>

[![Live](https://img.shields.io/badge/Live_Deployment-%23ffffff.svg?style=for-the-badge&logo=googlechrome&logoColor=000000)](https://blinkurl-ppd2.onrender.com//)

</center>

## Features

- Custom short URLs with optional custom slugs
- Auto-generated QR code for every short link
- Click analytics dashboard:
  - Geographic insights
  - Device/browser breakdown
  - Time-based traffic patterns
  - Suspicious traffic detection
- Secure authentication with JWT + HTTP-only cookies
- Responsive, modern UI with accessible primitives

---

## Tech Stack

### Frontend

| Tech            | Purpose                      |
| --------------- | ---------------------------- |
| React 19        | UI framework                 |
| TanStack Router | Client-side routing          |
| Redux Toolkit   | State management             |
| Tailwind CSS    | Styling                      |
| Radix UI        | Accessible UI primitives     |
| shadcn/ui       | Reusable UI components       |
| Lucide React    | Icons                        |
| Recharts        | Analytics/data visualization |
| Axios           | API requests                 |
| qrcode          | QR code generation           |
| Sonner          | Toast notifications          |
| Vite            | Build tool + dev server      |

### Backend

| Tech               | Purpose                               |
| ------------------ | ------------------------------------- |
| Node.js + Express  | REST API server                       |
| MongoDB + Mongoose | Database + ODM                        |
| JWT + bcryptjs     | Authentication + password hashing     |
| CORS               | Cross-origin request handling         |
| cookie-parser      | Cookie parsing for auth/session flows |
| nanoid             | Short URL slug generation             |
| geoip-lite         | Geo-location analytics                |
| ua-parser-js       | Device/browser analytics              |
| Winston            | Structured logging                    |
| dotenv             | Environment variable management       |

---

## Installation

### Prerequisites

Before you begin, ensure the following are installed:

- Node.js (v16+)
- MongoDB (v5+)
- npm or yarn
- Git

## Environment Variables

#### Backend (`backend/.env`)

```env
NODE_ENV=production
PORT=3000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
COOKIE_DOMAIN=.yourdomain.com
APP_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

#### Frontend (`frontend/.env`)

```env
VITE_BACKEND_URL=https://api.yourdomain.com
VITE_APP_URL=https://yourdomain.com
```

## Acknowledgments

- **[MarinatedProject](https://github.com/MarinatedProjects/)** - For bug testing
- **[Aaron Iker](https://codepen.io/aaroniker/pen/pojaBvb/)** - For his Underline Animations
- **[Storyset](https://storyset.com/)** - For the beautiful SVG illustrations used in this project
