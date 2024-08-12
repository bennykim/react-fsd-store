import { useQuery, UseQueryResult } from "react-query";

import { Product } from "@/entities/product/model";
import { fetchProductById } from "@/shared/api/products";

import { useProductStore } from "./store";

export type UseProductDetailsResult = UseQueryResult<Product, Error>;

export const useProductDetails = (id?: Product["id"]) => {
  const { setProduct } = useProductStore();

  return useQuery(
    ["product", id],
    () => {
      if (!id) {
        throw new Error("Product ID is required");
      }
      return fetchProductById(id);
    },
    {
      enabled: !!id,
      onSuccess: (data) => {
        setProduct(data);
      },
    }
  );
};
