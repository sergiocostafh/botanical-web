import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";
import connectPg from "connect-pg-simple";

const PRIMARY_ADMIN_EMAIL = "sergio.vscf@gmail.com";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  const sessionSecret = process.env.SESSION_SECRET || 
    'googleauth_' + Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15) + 
    Date.now().toString();
    
  return session({
    secret: sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  });
}

export async function setupGoogleAuth(app: Express) {
  const clientId = process.env.GOOGLE_CLIENT_ID || "13668400525-7ce3l7f041nplfr3e5v1jr851dink5vr.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "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";
  
  if (!clientId || !clientSecret) {
    console.warn("Google OAuth not configured. GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required.");
    return;
  }

  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Google Strategy
  const callbackURL = process.env.NODE_ENV === 'production' 
    ? `https://${process.env.REPLIT_DOMAINS}/api/auth/google/callback`
    : `https://${process.env.REPLIT_DOMAINS}/api/auth/google/callback`;
    
  passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error("No email found in Google profile"));
      }

      // Check if user is authorized (primary admin or in admin list)
      const isPrimaryAdmin = email === PRIMARY_ADMIN_EMAIL;
      const isAuthorizedAdmin = await storage.isUserAdmin(email);

      if (!isPrimaryAdmin && !isAuthorizedAdmin) {
        return done(new Error("User not authorized for admin access"));
      }

      // Create or update user
      const userData = {
        id: profile.id,
        email: email,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        profileImageUrl: profile.photos?.[0]?.value,
      };

      const user = await storage.upsertUser(userData);

      // Ensure primary admin is in admin list
      if (isPrimaryAdmin) {
        try {
          await storage.addAdminUser({
            userId: user.id,
            email: user.email!,
          });
        } catch (error) {
          // Ignore if already exists
        }
      }

      return done(null, {
        ...user,
        isAdmin: true,
        accessToken,
      });

    } catch (error) {
      return done(error);
    }
  }));

  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });

  // Routes
  app.get("/api/auth/google", (req, res, next) => {
    console.log("Starting Google OAuth flow...");
    console.log("Callback URL configured:", callbackURL);
    passport.authenticate("google", { 
      scope: ["profile", "email"],
      accessType: 'offline',
      prompt: 'consent'
    })(req, res, next);
  });

  app.get("/api/auth/google/callback",
    passport.authenticate("google", { 
      failureRedirect: "/admin/login?error=unauthorized",
      session: true
    }),
    (req, res) => {
      console.log("Google OAuth callback successful for user:", req.user);
      res.redirect("/admin/dashboard");
    }
  );

  app.get("/api/auth/logout", (req, res) => {
    req.logout(() => {
      req.session.destroy(() => {
        res.redirect("/admin/login");
      });
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};