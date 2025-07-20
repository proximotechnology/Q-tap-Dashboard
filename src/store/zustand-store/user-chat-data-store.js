import { create } from 'zustand';

export const usePlanPricingStore = create((set) => (
    {
        isLoged: false,
        logedData: {},

        logedIn: ({ name, email, phone, address }) => {
            set({ isLogged: true, logedData: { name, email, phone, address } })
        },

        reset: () => {
            set({ isLoged: false, logedData: {} })
        },

    }
))