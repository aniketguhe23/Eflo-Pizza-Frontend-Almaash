import { create } from "zustand";

export interface PizzaOption {
  id: string;
  name: string;
  price: number;
  size?: string;
  image_url?: string;
  image?: string;
}

export interface HomeData {
  sizes: PizzaOption[];
  doughTypes: PizzaOption[];
  crustTypes: PizzaOption[];
  sauces: PizzaOption[];
  cheeseOptions: PizzaOption[];
  toppings: PizzaOption[];
  extraSauces: PizzaOption[];
}

interface HomeDataState {
  data: HomeData | null;
  loading: boolean;
  setData: (data: HomeData) => void;
  setLoading: (loading: boolean) => void;
}

const useHomeDataStore = create<HomeDataState>((set) => ({
  data: null,
  loading: true,
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
}));

export default useHomeDataStore;
