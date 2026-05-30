import axios from "axios";

export const api = axios.create({
  baseURL: "https://event-hub-backend-production-20ee.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});