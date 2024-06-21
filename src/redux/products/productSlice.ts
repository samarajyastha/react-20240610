import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductQuery } from "../../types/product";
import { createProduct, deleteProduct, getAllProducts } from "./productActions";

type ProductState = {
  loading: boolean;
  error: string | null;
  products: Product[];
  query: ProductQuery;
  success: boolean;
};

const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
  query: {},
  success: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    sort: (state, action) => {
      state.query.sort = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
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
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { sort, resetSuccess } = productSlice.actions;

export default productSlice.reducer;
