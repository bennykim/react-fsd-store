import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Product } from "@/entities/product/model";
import { useCartStore } from "@/features/cart/model/store";

describe("useCartStore", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    price: 100,
    image: "test.jpg",
    description: "Test",
  };

  const mockProduct2: Product = {
    id: "2",
    name: "Test Product 2",
    price: 200,
    image: "test2.jpg",
    description: "Test 2",
  };

  const setup = () => {
    const { result } = renderHook(() => useCartStore());
    return { result };
  };

  const addItemToCart = (
    result: ReturnType<typeof setup>["result"],
    product: Product
  ) => {
    act(() => {
      result.current.addItem(product);
    });
  };

  it("should add item to cart", () => {
    const { result } = setup();

    addItemToCart(result, mockProduct);

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(
      expect.objectContaining({
        id: "1",
        name: "Test Product",
        quantity: 1,
      })
    );
  });

  it("should remove item from cart", () => {
    const { result } = setup();

    addItemToCart(result, mockProduct);

    act(() => {
      result.current.removeItem("1");
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("should update item quantity", () => {
    const { result } = setup();

    addItemToCart(result, mockProduct);

    act(() => {
      result.current.updateQuantity("1", 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it("should clear cart", () => {
    const { result } = setup();

    addItemToCart(result, mockProduct);
    addItemToCart(result, mockProduct2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });
});
