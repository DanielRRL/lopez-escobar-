// Import the mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the provided URL
        await mongoose.connect("mongodb://localhost/merndb");
        // Log a success message if the connection is established
        console.log(">>> DB conected successfully <<<");
    } catch (error) {
        // Log an error message if the connection fails
        console.log("Error connecting to the database");
    }
};
