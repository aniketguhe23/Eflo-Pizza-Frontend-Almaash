import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
    waId: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    dateOfBirth: string;
    address_home: string;
    address_work: string;
    address_others: string;
    addresses: [];
};

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    logout: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            logout: () => {
                localStorage.removeItem('token');
                set({ user: null });
            },
        }),
        {
            name: 'user-storage', // key in localStorage
        }
    )
);
