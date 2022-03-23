import axios from "axios"

const url = process.env.API_URL || "http:localhost:5000"
const api = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export default api
