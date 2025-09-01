import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  passwordHash: varchar("password_hash").notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role", { enum: ["student", "agent", "admin"] }).notNull().default("student"),
  schoolId: varchar("school_id"),
  verifiedStatus: boolean("verified_status").default(false),
  businessRegNumber: varchar("business_reg_number"), // For agents
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const schools = pgTable("schools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const locations = pgTable("locations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  schoolId: varchar("school_id").notNull(),
  name: varchar("name").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hostels = pgTable("hostels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  agentId: varchar("agent_id").notNull(),
  locationId: varchar("location_id").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  price: integer("price").notNull(), // Price in naira
  priceType: varchar("price_type", { enum: ["semester", "year"] }).notNull().default("semester"),
  roomType: varchar("room_type", { enum: ["single", "shared", "self-contain"] }).notNull(),
  images: text("images").array(), // Array of image URLs
  amenities: text("amenities").array(), // Array of amenities
  availability: boolean("availability").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  hostelId: varchar("hostel_id").notNull(),
  preferredDate: timestamp("preferred_date"),
  preferredTime: varchar("preferred_time"),
  message: text("message"),
  status: varchar("status", { enum: ["pending", "confirmed", "cancelled", "completed"] }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  school: one(schools, {
    fields: [users.schoolId],
    references: [schools.id],
  }),
  hostels: many(hostels),
  bookings: many(bookings),
}));

export const schoolsRelations = relations(schools, ({ many }) => ({
  users: many(users),
  locations: many(locations),
}));

export const locationsRelations = relations(locations, ({ one, many }) => ({
  school: one(schools, {
    fields: [locations.schoolId],
    references: [schools.id],
  }),
  hostels: many(hostels),
}));

export const hostelsRelations = relations(hostels, ({ one, many }) => ({
  agent: one(users, {
    fields: [hostels.agentId],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [hostels.locationId],
    references: [locations.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  student: one(users, {
    fields: [bookings.studentId],
    references: [users.id],
  }),
  hostel: one(hostels, {
    fields: [bookings.hostelId],
    references: [hostels.id],
  }),
}));

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type School = typeof schools.$inferSelect;
export type InsertSchool = typeof schools.$inferInsert;

export type Location = typeof locations.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;

export type Hostel = typeof hostels.$inferSelect;
export type InsertHostel = typeof hostels.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSchoolSchema = createInsertSchema(schools).omit({
  id: true,
  createdAt: true,
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
  createdAt: true,
});

export const insertHostelSchema = createInsertSchema(hostels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUserType = z.infer<typeof insertUserSchema>;
export type InsertSchoolType = z.infer<typeof insertSchoolSchema>;
export type InsertLocationType = z.infer<typeof insertLocationSchema>;
export type InsertHostelType = z.infer<typeof insertHostelSchema>;
export type InsertBookingType = z.infer<typeof insertBookingSchema>;
