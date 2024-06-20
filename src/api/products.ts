import { Product, ProductQuery } from "../types/product";
import api from "./api";

const getAll = async ({
  limit = 10,
  sort = { createdAt: -1 },
  filters = {},
  offset = 0,
}: ProductQuery) => {
  const queryParams = `limit=${limit}&offset=${offset}&sort=${JSON.stringify(
    sort
  )}&filters=${JSON.stringify(filters)}`;

  const response = api.get(`/products?${queryParams}`);

  return response;
};

const create = async (data: Product) => {
  const createdProduct = await api.post(`/products`, data);

  return createdProduct;
};

export { getAll, create };
