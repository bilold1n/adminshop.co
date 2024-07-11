import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: string;
  category: string;
}

interface ProductState {
  product: Product[];
  filtereddata: Product[];
}

const initialState: ProductState = {
  product: [],
  filtereddata: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getproduct: (state, action: PayloadAction<any[]>) => {
      state.product = action.payload;
      state.filtereddata = action.payload;
    },
    filterdata: (state, action: PayloadAction<any>) => {
      switch (action.payload) {
        case "rating":
          state.filtereddata = [...state.filtereddata].sort(
            (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
          );
          break;
        case "price":
          state.filtereddata = [...state.filtereddata].sort(
            (a, b) => b.price - a.price
          );
          break;
        case "text":
          state.filtereddata = [...state.filtereddata].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        case "!text":
          state.filtereddata = [...state.filtereddata].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        default:
          break;
      }
    },
    searchData: (state, { payload }) => {
      state.filtereddata = [
        ...state.product.filter(({ title }) =>
          title.toLowerCase().includes(payload.toLowerCase())
        ),
      ];
      console.log(state.filtereddata);
    },
  },
});

export const { getproduct, filterdata, searchData } = ProductSlice.actions;
export default ProductSlice.reducer;
