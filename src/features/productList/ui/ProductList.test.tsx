import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Product } from "@/entities/product/model";
import { useProductListStore } from "@/features/productList/model/store";
import {
  useProducts,
  UseProductsResult,
} from "@/features/productList/model/useProducts";
import { ProductCard } from "@/widgets/productCard/ProductCard";

import { ProductList } from "./ProductList";

vi.mock("@/features/productList/model/useProducts");
vi.mock("@/features/productList/model/store");
vi.mock("@/widgets/productCard/ProductCard", () => ({
  ProductCard: vi.fn(() => null),
}));

const mockUseProducts = vi.mocked(useProducts);
const mockUseProductListStore = vi.mocked(useProductListStore);
const MockProductCard = vi.mocked(ProductCard);

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 10,
    image: "image1.jpg",
    description: "Description 1",
  },
  {
    id: "2",
    name: "Product 2",
    price: 20,
    image: "image2.jpg",
    description: "Description 2",
  },
];

describe("ProductList", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const setupTest = (
    useProductsReturn: Partial<UseProductsResult>,
    storeProducts: Product[] = []
  ) => {
    mockUseProducts.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
      ...useProductsReturn,
    } as UseProductsResult);

    mockUseProductListStore.mockImplementation(() => ({
      products: storeProducts,
    }));

    render(<ProductList />);
  };

  it("renders loading state", () => {
    setupTest({ isLoading: true });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    setupTest({ error: new Error("Failed to fetch") });
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  it("renders no products found state", () => {
    setupTest({});
    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("renders ProductCard components for each product", () => {
    setupTest({ data: mockProducts }, mockProducts);

    expect(MockProductCard).toHaveBeenCalledTimes(mockProducts.length);
    mockProducts.forEach((product, index) => {
      expect(MockProductCard).toHaveBeenNthCalledWith(
        index + 1,
        { product },
        {}
      );
    });
  });
});
