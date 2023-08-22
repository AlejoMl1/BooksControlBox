import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BooksInitialState {
  catalog: Array<any>;
  actualBookUuid: string;
}

const initialState: BooksInitialState = {
  catalog: [],
  actualBookUuid: "",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    loadCatalog: (state, action: PayloadAction<Array<any>>) => {
      state.catalog = action.payload;
    },
    setBookUuid: (state, action: PayloadAction<string>) => {
      state.actualBookUuid = action.payload;
    },
  },
});

export const { loadCatalog, setBookUuid } = booksSlice.actions;
export default booksSlice.reducer;
