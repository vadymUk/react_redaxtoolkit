import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    itemsQuantity: 0,
    isCartContentChange: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            state.itemsQuantity++;
            state.isCartContentChange = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.price * existingItem.quantity;
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.itemsQuantity--;
            state.isCartContentChange = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
            }
        },
        upDataCart(state, action) {
            state.items = action.payload.items;
            state.itemsQuantity = action.payload.itemsQuantity;
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
