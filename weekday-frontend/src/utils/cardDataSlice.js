import { createSlice } from "@reduxjs/toolkit";

const cardDataSlice = createSlice({
  name: "cardData",
  initialState: {
    cardData: [],
    totalCount: 0,
    currentOffset: 1,
    currentCount: 0,
    hasMoreData: false
  },
  reducers: {
    addCardData: (state, action) => {
      state.cardData = [...state.cardData, ...action.payload];
      return;
    },
    addTotalCount: (state, action) => {
      state.totalCount = action.payload;
      return;
    },
    addCurrentOffset: (state, action) => {
      state.currentOffset = action.payload;
      return;
    },
    addCurrentCount: (state, action) => {
      state.currentCount = action.payload;
      return;
    },
    addHasMoreData: (state, action) => {
      state.hasMoreData = action.payload;
      return;
    }
  },
});

export const {
  addCardData,
  addTotalCount,
  addCurrentOffset,
  addCurrentCount,
  addHasMoreData
} = cardDataSlice.actions;
export default cardDataSlice.reducer;
