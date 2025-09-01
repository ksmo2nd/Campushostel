# 🛠️ Development Setup Guide

## Architecture Overview

CampusHostel is a **Vite + Express.js** full-stack application:

- **Frontend**: React 18 + TypeScript built with Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite builds the frontend, esbuild bundles the server

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 3. Database Setup
```bash
npm run db:push
```

### 4. Development Mode
```bash
npm run dev
```
This runs the server in development mode with:
- Hot reloading for both frontend and backend
- Vite dev server integrated with Express
- Available at `http://localhost:5000`

### 5. Production Build & Test
```bash
npm run build
npm start
```

## Development vs Production

### Development Mode (`npm run dev`)
- **Server**: Runs directly from TypeScript source with tsx
- **Frontend**: Served by Vite dev server with HMR
- **Port**: 5000 (or PORT env variable)
- **Hot Reload**: ✅ Both frontend and backend

### Production Mode (`npm run build` + `npm start`)
- **Server**: Compiled to `dist/index.js` with esbuild
- **Frontend**: Built to `dist/public/` with Vite
- **Static Files**: Served by Express from `dist/public/`
- **Port**: 5000 (or PORT env variable)

## File Structure

```
Campushostel/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # React entry point
│   └── index.html         # HTML template
├── server/                # Backend Express app
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── auth.ts           # Authentication
│   ├── storage.ts        # Database operations
│   ├── db.ts            # Database connection
│   └── vite.ts          # Vite integration
├── shared/               # Shared types/schemas
├── dist/                 # Build output
│   ├── index.js         # Compiled server
│   └── public/          # Built frontend
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema

## Environment Variables

```env
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres

# Server
SESSION_SECRET=your-session-secret
NODE_ENV=development
PORT=5000
```

## Troubleshooting

### "Raw JavaScript" Instead of Website
This happens when:
1. `NODE_ENV` is not set properly
2. Frontend build is missing (`npm run build`)
3. Server can't find `dist/public/` directory

**Solution**:
```bash
npm run build
NODE_ENV=production npm start
```

### Database Connection Issues
1. Check your `DATABASE_URL` in `.env`
2. Ensure Supabase project is running
3. Run `npm run db:push` to sync schema

### Port Already in Use
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9
# Or use a different port
PORT=3000 npm run dev
```

## Production Deployment

### Build Process
```bash
npm run build
```
This creates:
- `dist/index.js` - Server bundle
- `dist/public/` - Frontend assets

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your-production-db-url
SESSION_SECRET=secure-random-string
```

### Deploy to Any Platform
The built application is platform-agnostic and can deploy to:
- **Vercel**: Use `npm start` as start command
- **Railway**: Automatic deployment from GitHub
- **Render**: Node.js service with build command
- **AWS/GCP/Azure**: Standard Node.js deployment
- **Docker**: Create Dockerfile with Node.js base image

## Development Tips

1. **Hot Reload**: Changes to server files automatically restart the server
2. **Frontend HMR**: React components update instantly
3. **Database**: Use Drizzle Studio for database management
4. **Debugging**: Use VS Code debugger with tsx
5. **Testing**: Build and test production mode before deploying

## Common Issues

### CSS Not Loading
- Ensure `npm run build` completed successfully
- Check that `dist/public/assets/` contains CSS files

### API Routes Not Working
- Verify routes are defined in `server/routes.ts`
- Check authentication middleware is applied correctly

### Database Schema Changes
```bash
# After modifying shared/schema.ts
npm run db:push
```

This guide should help you understand the Vite + Express.js architecture and resolve any development issues!