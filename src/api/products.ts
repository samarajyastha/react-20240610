import axios from "axios";
import config from "../config/config";
import { ProductQuery } from "../types/product";

const getAll = async ({
  limit = 10,
  sort = { createAt: -1 },
  filters = {},
  offset = 0,
}: ProductQuery) => {
  const queryParams = `limit=${limit}&offset=${offset}&sort=${JSON.stringify(
    sort
  )}&filters=${JSON.stringify(filters)}`;

  const response = axios.get(`${config.apiUrl}/api/products?${queryParams}`);

  return response;
};

export { getAll };
