import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { getServerSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      locationId: searchParams.get('locationId') || undefined,
      priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined,
      priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined,
      roomType: searchParams.get('roomType') || undefined,
      availability: searchParams.get('availability') ? searchParams.get('availability') === 'true' : undefined,
    }

    const hostels = await storage.getHostels(filters)

    return NextResponse.json({
      success: true,
      data: hostels
    })

  } catch (error) {
    console.error('Get hostels error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'agent') {
      return NextResponse.json(
        { success: false, message: 'Agent role required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    const hostelData = {
      ...body,
      agentId: session.user.id,
    }

    const newHostel = await storage.createHostel(hostelData)

    return NextResponse.json({
      success: true,
      data: newHostel,
      message: 'Hostel created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create hostel error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}