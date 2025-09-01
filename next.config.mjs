/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['drizzle-orm', '@supabase/supabase-js', 'postgres'],
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;