import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // comes from Vercel env variable
  withCredentials: true,
});

export default API;
