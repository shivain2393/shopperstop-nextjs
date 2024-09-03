import { useEffect, useState } from "react";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import useHydratedUserStore from "./useUserStore";
import axios from "axios";

const updateCart = async (cart) => {
    try {
        const response = await axios.post('/api/update-cart', { cart });

        if(response.status !== 200){
            throw new Error(response.data);
        }
        
        return;

    } catch (error) {
        console.error(error);
    }
}

const useCartStore = create(
    devtools(
            (set, get) => ({
                cartItems: [],
                setCart: (cart) => set({
                    cartItems: cart
                }),
                addItemToCart: async (item) => {
                    const updatedCart = [...get().cartItems, item];
            
                    set({ cartItems: updatedCart });
            
                    await updateCart(updatedCart);
                },
                removeItemFromCart: async (item) => {
                    const updatedCart = get().cartItems.filter(product => product.id !== item.id);
                    set({ cartItems: updatedCart });
            
                    await updateCart(updatedCart);
                }
            }), { name: "CartStore" }
    )
)


const useHydratedCartStore = () => {
    const store = useCartStore();
    const [isHydrated, setIsHydrated] = useState(false);
    const { isAuthenticated } = useHydratedUserStore();

    useEffect(() => {
        setIsHydrated(true);
    }, [])

    useEffect(() => {
        if(isAuthenticated){
            const fetchCart = async () => {
                try {
                    const response = await axios.get('/api/get-cart');

                    if(response.status !== 200){
                        throw new Error(response.data);
                    }

                    store.setCart(response.data.data);

                } catch (error) {
                    console.error("Error in fetching cart");
                }
            }

            fetchCart();
        }
    }, [isAuthenticated])

    if(!isHydrated){
        return {
            cartItems: [],
        }
    }

    return store;
}

export default useHydratedCartStore;