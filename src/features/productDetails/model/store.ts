import { create } from "zustand";

import { Product } from "@/entities/product/model";

interface ProductStore {
  product: Product;
  setProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  product: {
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
  },
  setProduct: (product) => set({ product }),
}));
