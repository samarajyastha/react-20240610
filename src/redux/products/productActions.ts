import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll } from "../../api/products";

const getAllProducts = createAsyncThunk("products/all", async () => {
  const response = await getAll();

  return response.data;
});

export { getAllProducts };
