// Import the Express application instance
import app from './app.js';
// Import the database connection function
import { connectDB } from './db.js';

// Connect to the database
connectDB();

// Start the server and listen on port 4000
app.listen(4000);

// Log a message to the console indicating that the server is running
console.log('server running on port 4000', 4000);
