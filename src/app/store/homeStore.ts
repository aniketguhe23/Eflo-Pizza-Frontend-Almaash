import { create } from "zustand";

// Type for pizza size and price variant
export interface Variant {
  size: string;
  price: number;
}

// Type for menu items with multiple variants
export interface MenuItem {
  name: string;
  imageUrl: string;
  variants: Variant[];
}

// Full CMS home content type based on your data
export interface HomeContent {
  id: number;
  hero_img: string;
  hero_bg_color: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_title_3: string;
  hero_button_1: string;
  hero_button_2: string;

  hero2_img1: string;
  hero2_img2: string;
  hero2_img3: string;
  hero2_bg_color: string;
  hero2_title_1: string;
  hero2_title_2: string;
  hero2_button_1: string;
  hero2_button_2: string;

  speciality1_maintitle: string;
  speciality1_subtitle: string;
  speciality1_card1_img: string;
  speciality1_card2_img: string;
  speciality1_card1_title: string;
  speciality1_card2_title: string;
  speciality1_card1_subtitle: string;
  speciality1_card2_subtitle: string;
  speciality1_card1_button: string;
  speciality1_card2_button: string;

  whyElfo_maintitle: string;
  whyElfo_title1: string;
  whyElfo_title2: string;
  whyElfo_title3: string;
  whyElfo_img1: string;
  whyElfo_img2: string;
  whyElfo_img3: string;
  whyElfo_desc1: string;
  whyElfo_desc2: string;
  whyElfo_desc3: string;

  eleCardComp_title: string;
  eleCardComp_desc: string;
  eleCardComp_img1: string;
  eleCardComp_img2: string;

  nav_logo_img: string;
  nav_logo_text: string;
  nav_bg_color: string;

  created_at: string;
  updated_at: string;
}

// Zustand store definition
interface HomeState {
  data: HomeContent | null;
  loading: boolean;
  menuItems: MenuItem[];
  setData: (data: HomeContent) => void;
  setLoading: (loading: boolean) => void;
  setMenuItems: (menu: MenuItem[]) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  data: null,
  loading: true,
  menuItems: [],
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setMenuItems: (menu) => set({ menuItems: menu }),
}));
