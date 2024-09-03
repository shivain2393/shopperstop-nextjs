import { useEffect, useState } from "react";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
    devtools(
        persist(
            (set) => (
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
            ), { name: "userStore" , storage: createJSONStorage(() => localStorage)}
        )
    )
)

const useHydratedUserStore = () => {
    const store = useUserStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, [])

    if(!isHydrated){
        return {
            user: null,
            isAuthenticated: false,
            setUser: () => {},
            signOut: () => {}
        }
    }

    return store;
}

export default useHydratedUserStore;
