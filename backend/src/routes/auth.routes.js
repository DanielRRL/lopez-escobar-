// Import the Router from Express to create a new router object
import { Router } from "express";
// Import controller functions for handling authentication requests
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";
// Import middleware to protect routes that require authentication
import { authRequired } from "../middlewares/validateToken.js";
// Import the validation middleware to validate request bodies against schemas
import { validateSchema } from "../middlewares/validator.middleware.js";
// Import the schemas for registration and login validation
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

// Create a new router instance
const router = Router();

// Define the route for user registration
// This route handles POST requests to /register and calls the register controller function
// It also validates the request body against the registerSchema
router.post("/register", validateSchema(registerSchema), register);

// Define the route for user login
// This route handles POST requests to /login and calls the login controller function
// It also validates the request body against the loginSchema
router.post("/login", validateSchema(loginSchema), login);

// Define the route for user logout
// This route handles POST requests to /logout and calls the logout controller function
router.post("/logout", logout);

// Define the route for accessing user profile
// This route handles GET requests to /profile, uses the authRequired middleware to protect the route,
// and then calls the profile controller function
router.get("/profile", authRequired, profile);

// Export the router to be used in the main application file
export default router;
