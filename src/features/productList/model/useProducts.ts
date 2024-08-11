import { useQuery, UseQueryResult } from "react-query";

import { Product } from "@/entities/product/model";
import { fetchProducts } from "@/shared/api/products";

import { useProductListStore } from "./store";

export type UseProductsResult = UseQueryResult<Product[], Error>;

export const useProducts = () => {
  const setProducts = useProductListStore((state) => state.setProducts);

  return useQuery("products", fetchProducts, {
    onSuccess: (data) => {
      setProducts(data);
    },
  });
};
