import { create } from "zustand";

import { Product } from "@/entities/product/model";

interface ProductListStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductListStore = create<ProductListStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
