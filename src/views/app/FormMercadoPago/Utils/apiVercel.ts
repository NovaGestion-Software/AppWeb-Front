import axios from "axios";

export const apiVercel = axios.create({
  baseURL: "https://mp-backend-psi.vercel.app/api",
});