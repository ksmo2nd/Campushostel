// Temporary simple auth endpoint - will implement NextAuth later
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Auth endpoint - to be implemented' })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Auth endpoint - to be implemented' })
}