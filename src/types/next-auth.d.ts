import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName?: string
      role: string
      verifiedStatus: boolean
    }
  }

  interface User {
    id: string
    email: string
    firstName: string
    lastName?: string
    role: string
    verifiedStatus: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    verifiedStatus: boolean
    firstName: string
    lastName?: string
  }
}