import { useQuery } from "react-query";

import { fetchProducts } from "@/shared/api/products";

import { useProductListStore } from "./store";

export const useProducts = () => {
  const setProducts = useProductListStore((state) => state.setProducts);

  return useQuery("products", fetchProducts, {
    onSuccess: (data) => {
      setProducts(data);
    },
  });
};
