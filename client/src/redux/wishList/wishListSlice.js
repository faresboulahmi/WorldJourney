import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    wishList: [],
};

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        wishListValue: (state, action) => {
            state.wishList = action.payload;
        },
        addToWishList: (state, action) => {
            state.wishList.push(action.payload);
        },
        removeWishList: (state, action) => {
            state.wishList = state.wishList.filter(wish => wish._id !== action.payload._id);
        },
        clear: () => {
            return { wishList: [] };
        },
    },
});
export const {wishListValue , addToWishList , removeWishList , clear} = wishListSlice.actions;
export default wishListSlice.reducer;