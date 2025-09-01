# CampusHostel - Nigerian Student Hostel Booking Platform

## Overview

CampusHostel is a full-stack web application designed for Nigerian students to find and book hostel accommodations around their universities. The platform serves three types of users: students who can browse and book hostel inspections, verified agents/owners who can list and manage hostels, and administrators who verify agents and manage content. The application includes role-based authentication, Google Maps integration, hostel listing management, and a booking system with email notifications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component system for consistent design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth using OpenID Connect with Passport.js strategy
- **Session Management**: Express sessions stored in PostgreSQL using connect-pg-simple
- **API Design**: RESTful endpoints with role-based access control

### Database Architecture
- **Database**: PostgreSQL hosted on Neon serverless platform
- **ORM**: Drizzle ORM with type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless driver with WebSocket support for optimal performance

### Authentication & Authorization
- **Provider**: Replit's OpenID Connect authentication system
- **Session Storage**: PostgreSQL-backed sessions with configurable TTL
- **Role System**: Three-tier role system (student, agent, admin) with route-level protection
- **Agent Verification**: Business registration number validation for agent accounts

### Data Models
- **Users**: Profile information with role-based fields and verification status
- **Schools**: University/institution registry with location data
- **Locations**: Hostel areas mapped to specific schools with geographic coordinates
- **Hostels**: Property listings with pricing, amenities, availability, and image storage
- **Bookings**: Inspection requests with status tracking and email notifications

### File Structure
- **Monorepo**: Single repository with clear separation between client and server code
- **Shared Types**: Common TypeScript types and Zod schemas shared between frontend and backend
- **Component Organization**: Feature-based component structure with reusable UI primitives
- **Route Organization**: RESTful API structure with logical endpoint grouping

## External Dependencies

### Database & Infrastructure
- **Neon**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe database operations and schema management

### Authentication
- **Replit Auth**: OpenID Connect authentication provider
- **Passport.js**: Authentication middleware for Express

### Development & Build Tools
- **Vite**: Frontend build tool with React plugin
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Backend bundling for production deployment

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Maps & Location Services
- **Google Maps API**: Interactive maps and location services (planned integration)

### Email Services
- **Gmail API/SendGrid**: Email notification system for booking confirmations (planned integration)