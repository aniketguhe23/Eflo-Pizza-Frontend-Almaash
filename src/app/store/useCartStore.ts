import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  dough?: "original" | "sour";
  crust?: "original" | "garlic";
  toppings?: string[];
  suggestions?: string[];
  fromSuggestion?: boolean;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  image: string;
  added: boolean;
}

interface CartState {
  orderItems: OrderItem[];
  addOns: AddOnItem[];
  restaurantNo: string | null; // ✅ added
  restaurantAddress: string | null; // ✅ added
  setRestaurantNo: (no: string) => void; // ✅ added
  setRestaurantAddress: (no: string) => void; // ✅ added

  setOrderItems: (items: OrderItem[]) => void;
  setAddOns: (items: AddOnItem[]) => void;

  addItem: (item: OrderItem) => void;
  updateQuantity: (id: string, change: number) => void;
  toggleAddOn: (id: string) => void;

  addSuggestionToOrder: (item: {
    id: string | number;
    name: string;
    imageUrl: string;
    variants?: { price: number }[];
  }) => void;

  resetCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      orderItems: [],
      addOns: [],
      restaurantNo: null, // ✅ default null
      restaurantAddress: null, // ✅ default null

      setRestaurantNo: (no) => set({ restaurantNo: no }), // ✅ setter
      setRestaurantAddress: (no) => set({ restaurantAddress: no }), // ✅ setter

      setOrderItems: (items) => set({ orderItems: items }),
      setAddOns: (items) => set({ addOns: items }),

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.orderItems.find(
            (item) => item.id === newItem.id
          );
          if (existingItem) {
            return {
              orderItems: state.orderItems.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          } else {
            return {
              orderItems: [...state.orderItems, newItem],
            };
          }
        }),

      updateQuantity: (id, change) =>
        set((state) => ({
          orderItems: state.orderItems
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity + change) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      toggleAddOn: (id) =>
        set((state) => ({
          addOns: state.addOns.map((item) =>
            item.id === id ? { ...item, added: !item.added } : item
          ),
        })),

      addSuggestionToOrder: (item) =>
        set((state) => {
          const exists = state.orderItems.find((o) => o.id === item.id);
          if (exists) return state;

          const price = item.variants?.[0]?.price || 15;

          const newItem: OrderItem = {
            id: item.id.toString(),
            name: item.name,
            image: item.imageUrl,
            price,
            quantity: 1,
            size: "",
            dough: undefined,
            crust: undefined,
            toppings: [],
            suggestions: [],
            fromSuggestion: true,
          };

          return {
            orderItems: [...state.orderItems, newItem],
          };
        }),

      resetCart: () => set({ orderItems: [], addOns: [], restaurantNo: null }), // ✅ clear restaurantNo on reset
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
