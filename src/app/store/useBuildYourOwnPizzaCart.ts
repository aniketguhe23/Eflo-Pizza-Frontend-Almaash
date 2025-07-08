// app/store/useBuildYourOwnPizzaCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Category =
  | "sizes"
  | "doughTypes"
  | "sauces"
  | "cheeseOptions"
  | "toppings"
  | "extraSauces"
  | "crustTypes";

type SelectedOption = {
  name: string | null;
  size: string;
  price: number;
};

type PizzaBuild = {
  selections: Record<Category, SelectedOption | SelectedOption[] | null>;
  quantity: number;
};

interface PizzaCartStore {
  pizzas: PizzaBuild[];
  addPizza: (pizza: PizzaBuild) => void;
  removePizza: (index: number) => void;
  updatePizzaQuantity: (index: number, change: number) => void;
  clearPizzas: () => void;
}

const useBuildYourOwnPizzaCart = create<PizzaCartStore>()(
  persist(
    (set) => ({
      pizzas: [],
      addPizza: (pizza) =>
        set((state) => ({
          pizzas: [...state.pizzas, pizza],
        })),
      removePizza: (index) =>
        set((state) => ({
          pizzas: state.pizzas.filter((_, i) => i !== index),
        })),
      updatePizzaQuantity: (index, change) =>
        set((state) => {
          const updated = [...state.pizzas];
          const pizza = updated[index];
          const newQty = pizza.quantity + change;

          if (newQty <= 0) {
            updated.splice(index, 1); // remove pizza
          } else {
            updated[index] = { ...pizza, quantity: newQty };
          }

          return { pizzas: updated };
        }),

      clearPizzas: () => set({ pizzas: [] }),
    }),
    { name: "pizza-cart-storage" }
  )
);

export default useBuildYourOwnPizzaCart;
