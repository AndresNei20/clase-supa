import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";

export interface InitialState {
    products: Product[];
    cart: Product[]; 
}

const initialState: InitialState = {
    products: [],
    cart: [],
};

const productSlice = createSlice({
    name: "productsSlice",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setCart: (state, action: PayloadAction<Product>) => {
            state.cart = [...state.cart, action.payload];
        },
        clearCart: (state) => {
            state.cart = [];
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((p) => p.id !== action.payload);
        },

    },
});

export const { setProducts, setCart, clearCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
