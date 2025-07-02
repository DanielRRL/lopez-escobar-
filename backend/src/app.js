// Import necessary modules
import express from 'express'; // Express framework for building web applications
import morgan from 'morgan'; // HTTP request logger middleware
import cookieParser from 'cookie-parser'; // Middleware to parse cookies

// Import route modules
import authRoutes from './routes/auth.routes.js'; // Routes for authentication
import tasksRoutes from './routes/tasks.routes.js'; // Routes for tasks

// Initialize the Express application
const app = express();

// Middlewares
app.use(morgan('dev')); // Use morgan for logging requests in 'dev' format
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Parse cookies attached to the client request object

// API Routes
app.use('/api', authRoutes); // Use authentication routes for requests to /api
app.use('/api', tasksRoutes); // Use task routes for requests to /api

// Export the app instance for use in other files
export default app;
