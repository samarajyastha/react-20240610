import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { getAllProducts } from "./productActions";

type ProductState = {
  loading: boolean;
  error: string | null;
  products: Product[];
};

const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
