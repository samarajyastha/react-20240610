import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll } from "../../api/products";
import { ProductQuery } from "../../types/product";

const getAllProducts = createAsyncThunk(
  "products/all",
  async (query: ProductQuery) => {
    const response = await getAll(query);

    return response.data;
  }
);

export { getAllProducts };
