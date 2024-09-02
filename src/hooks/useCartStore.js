import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCartStore = create(devtools((set) => ({
    cartItems: [],
    addItemToCart: (item) => {
        set((state) => ({cartItems: [...state.cartItems, item]}));
    },
    removeItemFromCart: (item) => {
        set((state) => ({cartItems: state.cartItems.filter(i => i !== item)}));
    }
}), { name: "CartStore"}))

export default useCartStore;