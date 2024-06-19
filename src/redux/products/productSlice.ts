import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductQuery } from "../../types/product";
import { getAllProducts } from "./productActions";

type ProductState = {
  loading: boolean;
  error: string | null;
  products: Product[];
  query: ProductQuery;
};

const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
  query: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    sort: (state, action) => {
      state.query.sort = action.payload;
    },
  },
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

export const { sort } = productSlice.actions;

export default productSlice.reducer;
