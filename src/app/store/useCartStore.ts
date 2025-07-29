import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  type?: string;
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
    (set, get) => ({
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

      addSuggestionToOrder: (item) => {
        const currentItems: any = get().orderItems;
        const existingItemIndex = currentItems.findIndex(
          (orderItem: any) => orderItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          // If the item already exists, increase the quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += 1;
          set({ orderItems: updatedItems });
        } else {
          // Otherwise, add it as a new item with fromSuggestion: true
          const newItem = {
            id: item.id,
            name: item.name,
            quantity: 1,
            price: item.variants?.[0]?.price || 0,
            fromSuggestion: true,
            image: item.imageUrl,
          };
          set({ orderItems: [...currentItems, newItem] });
        }
      },

      resetCart: () =>
        set({
          orderItems: [],
          addOns: [],
          restaurantNo: null,
          restaurantAddress: null,
        }), // ✅ clear restaurantNo on reset
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
