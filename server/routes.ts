import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertHostelSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // School routes
  app.get('/api/schools', async (req, res) => {
    try {
      const schools = await storage.getSchools();
      res.json(schools);
    } catch (error) {
      console.error("Error fetching schools:", error);
      res.status(500).json({ message: "Failed to fetch schools" });
    }
  });

  // Location routes
  app.get('/api/schools/:schoolId/locations', async (req, res) => {
    try {
      const { schoolId } = req.params;
      const locations = await storage.getLocationsBySchool(schoolId);
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  // Hostel routes
  app.get('/api/hostels', async (req, res) => {
    try {
      const { schoolId, locationId, priceMin, priceMax, roomType, amenities } = req.query;
      
      const filters: any = {};
      if (schoolId) filters.schoolId = schoolId as string;
      if (locationId) filters.locationId = locationId as string;
      if (priceMin) filters.priceMin = parseInt(priceMin as string);
      if (priceMax) filters.priceMax = parseInt(priceMax as string);
      if (roomType) filters.roomType = roomType as string;
      if (amenities) filters.amenities = (amenities as string).split(',');

      const hostels = await storage.getHostels(filters);
      res.json(hostels);
    } catch (error) {
      console.error("Error fetching hostels:", error);
      res.status(500).json({ message: "Failed to fetch hostels" });
    }
  });

  app.get('/api/hostels/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const hostel = await storage.getHostelById(id);
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }
      res.json(hostel);
    } catch (error) {
      console.error("Error fetching hostel:", error);
      res.status(500).json({ message: "Failed to fetch hostel" });
    }
  });

  app.post('/api/hostels', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'agent' || !user.verifiedStatus) {
        return res.status(403).json({ message: "Only verified agents can create hostels" });
      }

      const hostelData = insertHostelSchema.parse({ ...req.body, agentId: userId });
      const hostel = await storage.createHostel(hostelData);
      res.status(201).json(hostel);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating hostel:", error);
      res.status(500).json({ message: "Failed to create hostel" });
    }
  });

  app.get('/api/agent/hostels', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const hostels = await storage.getHostelsByAgent(userId);
      res.json(hostels);
    } catch (error) {
      console.error("Error fetching agent hostels:", error);
      res.status(500).json({ message: "Failed to fetch hostels" });
    }
  });

  // Booking routes
  app.get('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      const filters: any = {};
      if (user?.role === 'student') {
        filters.studentId = userId;
      } else if (user?.role === 'agent') {
        filters.agentId = userId;
      }

      if (req.query.status) {
        filters.status = req.query.status as string;
      }

      const bookings = await storage.getBookings(filters);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'student') {
        return res.status(403).json({ message: "Only students can create bookings" });
      }

      const bookingData = insertBookingSchema.parse({ ...req.body, studentId: userId });
      const booking = await storage.createBooking(bookingData);
      
      // TODO: Send email notification to agent
      console.log("Booking created, sending notification email...");
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.patch('/api/bookings/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      const booking = await storage.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Check permissions
      if (user?.role === 'student' && booking.studentId !== userId) {
        return res.status(403).json({ message: "Not authorized" });
      }
      if (user?.role === 'agent' && booking.hostel.agentId !== userId) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const updatedBooking = await storage.updateBooking(id, req.body);
      res.json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ message: "Failed to update booking" });
    }
  });

  // Admin routes
  app.get('/api/admin/pending-agents', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const pendingAgents = await storage.getPendingAgents();
      res.json(pendingAgents);
    } catch (error) {
      console.error("Error fetching pending agents:", error);
      res.status(500).json({ message: "Failed to fetch pending agents" });
    }
  });

  app.post('/api/admin/verify-agent/:agentId', isAuthenticated, async (req: any, res) => {
    try {
      const { agentId } = req.params;
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const verifiedAgent = await storage.verifyAgent(agentId);
      res.json(verifiedAgent);
    } catch (error) {
      console.error("Error verifying agent:", error);
      res.status(500).json({ message: "Failed to verify agent" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
