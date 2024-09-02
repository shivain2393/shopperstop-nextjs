import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUserStore = create(devtools((set) => (
    {
        user: null,
        isAuthenticated: false,
        setUser : (user) => set({
            user,
            isAuthenticated: true
        }),

        signOut: () => set({
            user: null,
            isAuthenticated : false
        })
    }
), { name: "UserStore"}))

export default useUserStore;