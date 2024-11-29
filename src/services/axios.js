import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001",
});

export const mock = axios.create({
  baseURL: "http://localhost:9999",
});

export default api;
