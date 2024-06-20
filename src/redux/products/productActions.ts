import { createAsyncThunk } from "@reduxjs/toolkit";
import { create, getAll } from "../../api/products";
import { Product, ProductQuery } from "../../types/product";
import { AxiosError } from "axios";

const getAllProducts = createAsyncThunk(
  "products/all",
  async (query: ProductQuery) => {
    const response = await getAll(query);

    return response.data;
  }
);

const createProduct = createAsyncThunk(
  "products/add",
  async (data: Product, { rejectWithValue }) => {
    try {
      const response = await create(data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export { getAllProducts, createProduct };
