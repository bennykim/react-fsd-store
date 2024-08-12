import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Product } from "@/entities/product/model";
import { useProductStore } from "@/features/productDetails/model/store";
import { useProductDetails } from "@/features/productDetails/model/useProductDetails";

import { ProductDetails } from "./ProductDetails";

vi.mock("@/features/productDetails/model/useProductDetails");
vi.mock("@/features/productDetails/model/store");
vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
}));

const mockUseProductDetails = vi.mocked(useProductDetails);
const mockUseProductStore = vi.mocked(useProductStore);

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  price: 100,
  description: "Test Description",
  image: "test.jpg",
};

describe("ProductDetails", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const setupTest = (
    useProductDetailsReturn: Partial<ReturnType<typeof useProductDetails>>,
    storeProduct: Partial<Product> = {}
  ) => {
    mockUseProductDetails.mockReturnValue({
      isLoading: false,
      error: null,
      ...useProductDetailsReturn,
    } as ReturnType<typeof useProductDetails>);

    mockUseProductStore.mockReturnValue({ product: storeProduct });

    render(<ProductDetails />);
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

  it("renders product details", () => {
    setupTest({}, mockProduct);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute(
      "src",
      mockProduct.image
    );
  });
});
