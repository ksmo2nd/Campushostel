# 🏨 CampusHostel - Nigerian Student Hostel Booking Platform

A modern, full-stack web application designed to help Nigerian university students find and book hostel accommodations around their campuses.

## ✨ Features

### 🎓 For Students
- Browse and search hostels near universities
- Filter by location, price, room type, and amenities
- Book inspection appointments with hostel owners
- Track booking status and history
- Modern, responsive interface

### 🏢 For Hostel Agents/Owners
- List and manage hostel properties
- Handle booking requests from students
- Business verification system
- Agent dashboard for property management

### 👨‍💼 For Administrators
- Verify agent accounts and business registrations
- Manage schools and locations
- Platform oversight and content management

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** as build tool
- **Tailwind CSS** for styling
- **Radix UI** components with shadcn/ui
- **TanStack Query** for state management
- **React Hook Form** with Zod validation
- **Wouter** for client-side routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **Passport.js** with Local Strategy for authentication
- **PostgreSQL** with Supabase hosting
- **Drizzle ORM** for database operations
- **Session-based authentication**

### Database
- **PostgreSQL** hosted on Supabase
- **Drizzle ORM** with type-safe operations
- **Session storage** in PostgreSQL

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- PostgreSQL database (Supabase account recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ksmo2nd/Campushostel.git
   cd Campushostel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_postgresql_connection_string
   
   # Session Configuration
   SESSION_SECRET=your_session_secret_key
   
   # Application Configuration
   NODE_ENV=development
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
Campushostel/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Backend Express application
│   ├── auth.ts           # Authentication system
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── db.ts            # Database connection
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema definitions
└── dist/                # Build output directory
```

## 🔐 Authentication System

The application uses a secure, session-based authentication system:

- **Registration**: Email/password with bcrypt hashing
- **Login**: Local strategy with Passport.js
- **Sessions**: Stored in PostgreSQL with express-session
- **Role-based Access**: Student, Agent, and Admin roles
- **Security**: CSRF protection, secure cookies, password hashing

### API Endpoints

#### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

#### Hostels
- `GET /api/hostels` - Get all hostels (with filters)
- `POST /api/hostels` - Create new hostel (agents only)
- `PUT /api/hostels/:id` - Update hostel (agents only)
- `DELETE /api/hostels/:id` - Delete hostel (agents only)

#### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

## 🎨 Design System

The application features a modern **monochrome theme**:

- **Pure Black & White**: Elegant color palette
- **Light/Dark Mode**: User preference with system detection
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG AA compliant
- **Modern UI**: Clean, minimalist interface

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts with authentication
- **schools** - University/institution registry
- **locations** - Hostel areas mapped to schools
- **hostels** - Property listings with details
- **bookings** - Inspection requests and status
- **sessions** - User session storage

## 📱 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables for Production
Ensure all environment variables are set for production deployment:
- Set `NODE_ENV=production`
- Use secure session secrets
- Configure proper database URLs
- Set secure cookie settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better student housing solutions in Nigeria
- Designed for scalability and maintainability

---

**CampusHostel** - Making student accommodation search easier across Nigerian universities.