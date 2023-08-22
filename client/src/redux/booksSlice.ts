import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BooksInitialState {
  catalog: Array<any>;
}

const initialState: BooksInitialState = {
  catalog: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    loadCatalog: (state, action: PayloadAction<Array<any>>) => {
      state.catalog = action.payload;
    },
  },
});

export const { loadCatalog } = booksSlice.actions;
export default booksSlice.reducer;
