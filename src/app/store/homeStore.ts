// store/homeStore.ts or homeStore.js

import { create } from "zustand";

interface HomeState {
  data: any;
  loading: boolean;
  menuItems: any[];
  setData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setMenuItems: (menu: any[]) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  data: null,
  loading: true,
  menuItems: [],
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setMenuItems: (menu) => set({ menuItems: menu }),
}));
