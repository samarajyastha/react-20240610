import axios from "axios";
import config from "../config/config";

const getAll = async () => {
  const response = axios.get(`${config.apiUrl}/api/products`);

  return response;
};

export { getAll };
