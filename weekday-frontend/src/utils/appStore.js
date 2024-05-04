import { configureStore } from "@reduxjs/toolkit";
import cardDataSlice from "./cardDataSlice";

const appStore = configureStore({
    reducer:{
        cardData: cardDataSlice
    }
});
export default appStore;