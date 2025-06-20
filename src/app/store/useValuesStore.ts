import { create } from "zustand";
import { persist } from "zustand/middleware";

// Type
export interface ValueContent {
  id: number;
  hero_bg: string;
  hero_title: string;
  hero_subtitle: string;

  about_heading: string;
  about_title: string;
  about_subtitle: string;
  about_text: string;
  about_img: string;

  nearest_heading: string;
  nearest_title: string;
  nearest_subtitle: string;
  nearest_img: string;
  nearest_yes: string;
  nearest_yes_desc: string;
  nearest_no: string;
  nearest_no_desc: string;

  best_pizza_heading: string;
  best_pizza_heading2: string;
  best_pizza_title: string;
  best_pizza_desc: string;
  best_pizza_img1: string;
  best_pizza_img2: string;
  best_pizza_bgcolor: string;

  pizza_delivery_heading: string;
  pizza_delivery_title: string;
  pizza_delivery_desc: string;
  pizza_delivery_img: string;

  nearme_heading: string;
  nearme_subheading: string;
  nearme_icon1: string;
  nearme_icon1_desc: string;
  nearme_icon2: string;
  nearme_icon2_desc: string;
  nearme_title: string;
  nearme_desc: string;
  nearme_img: string;

  created_at: string;
  updated_at: string;
}

interface ValuesState {
  valueData: ValueContent | null;
  loading: boolean;
  setValueData: (data: ValueContent) => void;
  setLoading: (loading: boolean) => void;
}

export const useValuesStore = create<ValuesState>()(
  persist(
    (set) => ({
      valueData: null,
      loading: true,
      setValueData: (data) => set({ valueData: data }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "values-store",
      partialize: (state) => ({
        valueData: state.valueData,
      }),
    }
  )
);
