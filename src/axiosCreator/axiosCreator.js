import axios from "axios";

export const axiosCreator = axios.create({
  baseURL: process.env.BASE_URL,
});
