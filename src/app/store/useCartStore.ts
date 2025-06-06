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

  setOrderItems: (items: OrderItem[]) => void;
  setAddOns: (items: AddOnItem[]) => void;

  addItem: (item: OrderItem) => void;
  updateQuantity: (id: string, change: number) => void;
  toggleAddOn: (id: string) => void;

  resetCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      orderItems: [],
      addOns: [],

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

      resetCart: () => set({ orderItems: [], addOns: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
