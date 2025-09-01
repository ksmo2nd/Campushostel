# Supabase Integration Setup Guide

This project has been configured to use Supabase as the PostgreSQL database provider instead of Neon. Follow these steps to set up your Supabase integration:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be fully provisioned

## 2. Get Your Supabase Credentials

From your Supabase dashboard:

### Project URL and API Key
- Go to **Settings** > **API**
- Copy your **Project URL** (`SUPABASE_URL`)
- Copy your **anon/public key** (`SUPABASE_ANON_KEY`)

### Database Connection String
- Go to **Settings** > **Database**
- Scroll down to **Connection string** section
- Select **Direct connection** tab
- Copy the connection string and replace `[YOUR-PASSWORD]` with your actual database password
- This becomes your `DATABASE_URL`

## 3. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Database Configuration
DATABASE_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres

# Other required variables
SESSION_SECRET=your-session-secret-here
NODE_ENV=development
PORT=3000
```

## 4. Database Schema Migration

Run the following commands to set up your database schema:

```bash
# Push your schema to Supabase
npm run db:push

# Or if you have migrations
npm run migrate
```

## 5. Benefits of Supabase Integration

- **Single Dashboard**: Manage your database, authentication, and storage from one place
- **Built-in Auth**: Use Supabase's authentication system if needed
- **Real-time**: Built-in real-time subscriptions
- **Storage**: File storage capabilities
- **Edge Functions**: Serverless functions
- **Automatic Backups**: Built-in backup system

## 6. Available Features

The integration provides:

- **Database Connection**: Direct PostgreSQL connection via Drizzle ORM
- **Supabase Client**: Available for additional features like auth, storage, etc.
- **Real-time Capabilities**: Can be easily enabled for live updates
- **Row Level Security**: Can be configured for advanced security

## 7. Usage in Code

```typescript
// Database operations (same as before)
import { db } from './server/db';

// Supabase client for additional features
import { supabase } from './server/db';

// Example: Using Supabase auth
const { data: user } = await supabase.auth.getUser();

// Example: Real-time subscriptions
const subscription = supabase
  .channel('table-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'bookings' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe();
```

## 8. Migration from Neon

The migration is complete! The key changes made:

- ✅ Replaced `@neondatabase/serverless` with `@supabase/supabase-js`
- ✅ Updated database connection to use `postgres` driver
- ✅ Added Supabase client for additional features
- ✅ Maintained all existing Drizzle ORM functionality
- ✅ Created environment variable template

Your existing code should work without changes - only the underlying connection has been updated.