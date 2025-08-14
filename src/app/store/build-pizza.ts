// src/app/types/build-pizza.ts
import type { PizzaOption as StorePizzaOption } from "@/app/store/useBuildYourOwnStore";

/** Categories used across the UI — single source of truth */
export type Category =
  | "sizes"
  | "doughTypes"
  | "crustTypes"
  | "sauces"
  | "cheeseOptions"
  | "toppings"
  | "extraSauces";

/** Selection item type used in state */
export type SelectionItem = { name: string | null; size: string; price: number };
export type Selection = SelectionItem | SelectionItem[] | null;

/** Re-export store PizzaOption so other files import from the same place */
export type PizzaOption = StorePizzaOption;
