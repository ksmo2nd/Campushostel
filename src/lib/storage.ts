import { db } from './db'
import { users, schools, locations, hostels, bookings } from '../../shared/schema'
import { eq, and, ilike, inArray } from 'drizzle-orm'
import type {
  User,
  UpsertUser,
  School,
  InsertSchool,
  Location,
  InsertLocation,
  Hostel,
  InsertHostel,
  Booking,
  InsertBooking,
} from '../../shared/schema'

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>
  getUserById(id: string): Promise<User | undefined>
  getUserByEmail(email: string): Promise<User | undefined>
  createUser(userData: UpsertUser & { passwordHash: string }): Promise<User>
  upsertUser(user: UpsertUser): Promise<User>
  
  // School operations
  getSchools(): Promise<School[]>
  createSchool(school: InsertSchool): Promise<School>
  
  // Location operations
  getLocationsBySchool(schoolId: string): Promise<Location[]>
  createLocation(location: InsertLocation): Promise<Location>
  
  // Hostel operations
  getHostels(filters?: {
    schoolId?: string
    locationId?: string
    priceMin?: number
    priceMax?: number
    roomType?: string
    amenities?: string[]
    availability?: boolean
  }): Promise<Hostel[]>
  getHostel(id: string): Promise<Hostel | undefined>
  getHostelsByAgent(agentId: string): Promise<Hostel[]>
  createHostel(hostel: InsertHostel): Promise<Hostel>
  updateHostel(id: string, hostel: Partial<InsertHostel>): Promise<Hostel>
  deleteHostel(id: string): Promise<void>
  
  // Booking operations
  getBookings(filters?: {
    studentId?: string
    agentId?: string
    status?: string
  }): Promise<Booking[]>
  getBooking(id: string): Promise<Booking | undefined>
  createBooking(booking: InsertBooking): Promise<Booking>
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking>
  deleteBooking(id: string): Promise<void>
  
  // Admin operations
  getPendingAgents(): Promise<User[]>
  verifyAgent(agentId: string): Promise<User>
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user
  }

  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    return user
  }

  async createUser(userData: UpsertUser & { passwordHash: string }): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    return user
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning()
    return user
  }

  // School operations
  async getSchools(): Promise<School[]> {
    return await db.select().from(schools)
  }

  async createSchool(school: InsertSchool): Promise<School> {
    const [newSchool] = await db.insert(schools).values(school).returning()
    return newSchool
  }

  // Location operations
  async getLocationsBySchool(schoolId: string): Promise<Location[]> {
    return await db.select().from(locations).where(eq(locations.schoolId, schoolId))
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const [newLocation] = await db.insert(locations).values(location).returning()
    return newLocation
  }

  // Hostel operations
  async getHostels(filters?: {
    schoolId?: string
    locationId?: string
    priceMin?: number
    priceMax?: number
    roomType?: string
    amenities?: string[]
    availability?: boolean
  }): Promise<Hostel[]> {
    let query = db.select().from(hostels)

    // Apply filters
    const conditions = []
    
    if (filters?.locationId) {
      conditions.push(eq(hostels.locationId, filters.locationId))
    }
    
    if (filters?.priceMin) {
      conditions.push(eq(hostels.price, filters.priceMin)) // This should use gte when available
    }
    
    if (filters?.priceMax) {
      conditions.push(eq(hostels.price, filters.priceMax)) // This should use lte when available
    }
    
    if (filters?.roomType) {
      conditions.push(eq(hostels.roomType, filters.roomType as any))
    }
    
    if (filters?.availability !== undefined) {
      conditions.push(eq(hostels.availability, filters.availability))
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    return await query
  }

  async getHostel(id: string): Promise<Hostel | undefined> {
    const [hostel] = await db.select().from(hostels).where(eq(hostels.id, id))
    return hostel
  }

  async getHostelsByAgent(agentId: string): Promise<Hostel[]> {
    return await db.select().from(hostels).where(eq(hostels.agentId, agentId))
  }

  async createHostel(hostel: InsertHostel): Promise<Hostel> {
    const [newHostel] = await db.insert(hostels).values(hostel).returning()
    return newHostel
  }

  async updateHostel(id: string, hostel: Partial<InsertHostel>): Promise<Hostel> {
    const [updatedHostel] = await db
      .update(hostels)
      .set({ ...hostel, updatedAt: new Date() })
      .where(eq(hostels.id, id))
      .returning()
    return updatedHostel
  }

  async deleteHostel(id: string): Promise<void> {
    await db.delete(hostels).where(eq(hostels.id, id))
  }

  // Booking operations
  async getBookings(filters?: {
    studentId?: string
    agentId?: string
    status?: string
  }): Promise<Booking[]> {
    let query = db.select().from(bookings)

    const conditions = []
    
    if (filters?.studentId) {
      conditions.push(eq(bookings.studentId, filters.studentId))
    }
    
    if (filters?.status) {
      conditions.push(eq(bookings.status, filters.status as any))
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    return await query
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id))
    return booking
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning()
    return newBooking
  }

  async updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking> {
    const [updatedBooking] = await db
      .update(bookings)
      .set({ ...booking, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning()
    return updatedBooking
  }

  async deleteBooking(id: string): Promise<void> {
    await db.delete(bookings).where(eq(bookings.id, id))
  }

  // Admin operations
  async getPendingAgents(): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(and(eq(users.role, 'agent'), eq(users.verifiedStatus, false)))
  }

  async verifyAgent(agentId: string): Promise<User> {
    const [verifiedAgent] = await db
      .update(users)
      .set({ verifiedStatus: true, updatedAt: new Date() })
      .where(eq(users.id, agentId))
      .returning()
    return verifiedAgent
  }
}

export const storage = new DatabaseStorage()