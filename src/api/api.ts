import axios from "axios";
import config from "../config/config";

const api = axios.create({
  baseURL: `${config.apiUrl}/api`,
  withCredentials: true,
});

export default api;
