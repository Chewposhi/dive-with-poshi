import axios from "axios";

// Utility to handle API calls
console.log("api", process.env.NEXT_PUBLIC_API_URL)
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000, // Set a timeout for requests
});
