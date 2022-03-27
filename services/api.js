import axios from "axios"

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export default api
