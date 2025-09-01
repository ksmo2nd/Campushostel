import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import bcrypt from "bcrypt";
import { storage } from "./storage";

if (!process.env.SESSION_SECRET) {
  throw new Error("Environment variable SESSION_SECRET not provided");
}

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

// Configure Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Remove password hash from user object
      const { passwordHash, ...userWithoutPassword } = user;
      return done(null, userWithoutPassword);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUserById(id);
    if (!user) {
      return done(null, false);
    }
    
    // Remove password hash from user object
    const { passwordHash, ...userWithoutPassword } = user;
    done(null, userWithoutPassword);
  } catch (error) {
    done(error);
  }
});

export function setupAuth(app: Express) {
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Login route
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({ 
      success: true, 
      user: req.user,
      message: 'Login successful'
    });
  });

  // Register route
  app.post('/api/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName, role = 'student' } = req.body;

      // Validate input
      if (!email || !password || !firstName) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email, password, and first name are required' 
        });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User with this email already exists' 
        });
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create user
      const newUser = await storage.createUser({
        email,
        firstName,
        lastName,
        passwordHash,
        role,
        verifiedStatus: false
      });

      // Remove password hash from response
      const { passwordHash: _, ...userWithoutPassword } = newUser;

      // Log the user in
      req.login(userWithoutPassword, (err) => {
        if (err) {
          return res.status(500).json({ 
            success: false, 
            message: 'Registration successful but login failed' 
          });
        }

        res.status(201).json({ 
          success: true, 
          user: userWithoutPassword,
          message: 'Registration successful'
        });
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  });

  // Logout route
  app.post('/api/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Logout failed' 
        });
      }
      
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ 
            success: false, 
            message: 'Session destruction failed' 
          });
        }
        
        res.clearCookie('connect.sid');
        res.json({ 
          success: true, 
          message: 'Logout successful' 
        });
      });
    });
  });

  // Get current user route
  app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ 
        success: true, 
        user: req.user 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }
  });
}

// Middleware to check if user is authenticated
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    success: false, 
    message: 'Authentication required' 
  });
};

// Middleware to check user role
export const requireRole = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Insufficient permissions' 
      });
    }

    next();
  };
};