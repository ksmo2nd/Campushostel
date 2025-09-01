import {
  users,
  schools,
  locations,
  hostels,
  bookings,
  type User,
  type UpsertUser,
  type School,
  type InsertSchool,
  type Location,
  type InsertLocation,
  type Hostel,
  type InsertHostel,
  type Booking,
  type InsertBooking,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, ilike, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // School operations
  getSchools(): Promise<School[]>;
  createSchool(school: InsertSchool): Promise<School>;
  
  // Location operations
  getLocationsBySchool(schoolId: string): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Hostel operations
  getHostels(filters?: {
    schoolId?: string;
    locationId?: string;
    priceMin?: number;
    priceMax?: number;
    roomType?: string;
    amenities?: string[];
  }): Promise<(Hostel & { location: Location; agent: User })[]>;
  getHostelById(id: string): Promise<(Hostel & { location: Location; agent: User }) | undefined>;
  getHostelsByAgent(agentId: string): Promise<Hostel[]>;
  createHostel(hostel: InsertHostel): Promise<Hostel>;
  updateHostel(id: string, updates: Partial<InsertHostel>): Promise<Hostel>;
  deleteHostel(id: string): Promise<void>;
  
  // Booking operations
  getBookings(filters?: {
    studentId?: string;
    agentId?: string;
    status?: string;
  }): Promise<(Booking & { hostel: Hostel; student: User })[]>;
  getBookingById(id: string): Promise<(Booking & { hostel: Hostel; student: User }) | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking>;
  deleteBooking(id: string): Promise<void>;
  
  // Admin operations
  getPendingAgents(): Promise<User[]>;
  verifyAgent(agentId: string): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
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
      .returning();
    return user;
  }

  // School operations
  async getSchools(): Promise<School[]> {
    return await db.select().from(schools);
  }

  async createSchool(school: InsertSchool): Promise<School> {
    const [newSchool] = await db.insert(schools).values(school).returning();
    return newSchool;
  }

  // Location operations
  async getLocationsBySchool(schoolId: string): Promise<Location[]> {
    return await db.select().from(locations).where(eq(locations.schoolId, schoolId));
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const [newLocation] = await db.insert(locations).values(location).returning();
    return newLocation;
  }

  // Hostel operations
  async getHostels(filters?: {
    schoolId?: string;
    locationId?: string;
    priceMin?: number;
    priceMax?: number;
    roomType?: string;
    amenities?: string[];
  }): Promise<(Hostel & { location: Location; agent: User })[]> {
    const query = db
      .select({
        id: hostels.id,
        agentId: hostels.agentId,
        locationId: hostels.locationId,
        title: hostels.title,
        description: hostels.description,
        price: hostels.price,
        priceType: hostels.priceType,
        roomType: hostels.roomType,
        images: hostels.images,
        amenities: hostels.amenities,
        availability: hostels.availability,
        createdAt: hostels.createdAt,
        updatedAt: hostels.updatedAt,
        location: locations,
        agent: users,
      })
      .from(hostels)
      .leftJoin(locations, eq(hostels.locationId, locations.id))
      .leftJoin(users, eq(hostels.agentId, users.id))
      .where(eq(hostels.availability, true));

    return await query;
  }

  async getHostelById(id: string): Promise<(Hostel & { location: Location; agent: User }) | undefined> {
    const [hostel] = await db
      .select({
        id: hostels.id,
        agentId: hostels.agentId,
        locationId: hostels.locationId,
        title: hostels.title,
        description: hostels.description,
        price: hostels.price,
        priceType: hostels.priceType,
        roomType: hostels.roomType,
        images: hostels.images,
        amenities: hostels.amenities,
        availability: hostels.availability,
        createdAt: hostels.createdAt,
        updatedAt: hostels.updatedAt,
        location: locations,
        agent: users,
      })
      .from(hostels)
      .leftJoin(locations, eq(hostels.locationId, locations.id))
      .leftJoin(users, eq(hostels.agentId, users.id))
      .where(eq(hostels.id, id));

    return hostel;
  }

  async getHostelsByAgent(agentId: string): Promise<Hostel[]> {
    return await db.select().from(hostels).where(eq(hostels.agentId, agentId));
  }

  async createHostel(hostel: InsertHostel): Promise<Hostel> {
    const [newHostel] = await db.insert(hostels).values(hostel).returning();
    return newHostel;
  }

  async updateHostel(id: string, updates: Partial<InsertHostel>): Promise<Hostel> {
    const [updatedHostel] = await db
      .update(hostels)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(hostels.id, id))
      .returning();
    return updatedHostel;
  }

  async deleteHostel(id: string): Promise<void> {
    await db.delete(hostels).where(eq(hostels.id, id));
  }

  // Booking operations
  async getBookings(filters?: {
    studentId?: string;
    agentId?: string;
    status?: string;
  }): Promise<(Booking & { hostel: Hostel; student: User })[]> {
    let query = db
      .select({
        id: bookings.id,
        studentId: bookings.studentId,
        hostelId: bookings.hostelId,
        preferredDate: bookings.preferredDate,
        preferredTime: bookings.preferredTime,
        message: bookings.message,
        status: bookings.status,
        createdAt: bookings.createdAt,
        updatedAt: bookings.updatedAt,
        hostel: hostels,
        student: users,
      })
      .from(bookings)
      .leftJoin(hostels, eq(bookings.hostelId, hostels.id))
      .leftJoin(users, eq(bookings.studentId, users.id));

    if (filters?.studentId) {
      query = query.where(eq(bookings.studentId, filters.studentId));
    }

    if (filters?.status) {
      query = query.where(eq(bookings.status, filters.status));
    }

    return await query;
  }

  async getBookingById(id: string): Promise<(Booking & { hostel: Hostel; student: User }) | undefined> {
    const [booking] = await db
      .select({
        id: bookings.id,
        studentId: bookings.studentId,
        hostelId: bookings.hostelId,
        preferredDate: bookings.preferredDate,
        preferredTime: bookings.preferredTime,
        message: bookings.message,
        status: bookings.status,
        createdAt: bookings.createdAt,
        updatedAt: bookings.updatedAt,
        hostel: hostels,
        student: users,
      })
      .from(bookings)
      .leftJoin(hostels, eq(bookings.hostelId, hostels.id))
      .leftJoin(users, eq(bookings.studentId, users.id))
      .where(eq(bookings.id, id));

    return booking;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking> {
    const [updatedBooking] = await db
      .update(bookings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<void> {
    await db.delete(bookings).where(eq(bookings.id, id));
  }

  // Admin operations
  async getPendingAgents(): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(and(eq(users.role, "agent"), eq(users.verifiedStatus, false)));
  }

  async verifyAgent(agentId: string): Promise<User> {
    const [verifiedAgent] = await db
      .update(users)
      .set({ verifiedStatus: true, updatedAt: new Date() })
      .where(eq(users.id, agentId))
      .returning();
    return verifiedAgent;
  }
}

export const storage = new DatabaseStorage();
