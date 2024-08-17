import { act, renderHook } from "@testing-library/react";

import { Product } from "@/entities/product/model";
import { CartStore, useCartStore } from "@/features/cart/model/store";

describe("useCartStore", () => {
  let result: { current: CartStore };

  const testProduct: Product = {
    id: "1",
    name: "Test Product",
    price: 100,
    image: "test.jpg",
    description: "Test",
  };

  const testProduct2: Product = {
    id: "2",
    name: "Test Product 2",
    price: 200,
    image: "test2.jpg",
    description: "Test 2",
  };

  beforeEach(() => {
    const { result: hookResult } = renderHook(() => useCartStore());
    result = hookResult;
    act(() => {
      result.current.clearCart();
    });
  });

  const addItemToCart = (product: Product) => {
    act(() => {
      result.current.addItem(product);
      result.current.calculateTotal();
    });
  };

  it("should add item to cart", () => {
    addItemToCart(testProduct);

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
    addItemToCart(testProduct);

    act(() => {
      result.current.removeItem("1");
      result.current.calculateTotal();
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("should update item quantity", () => {
    addItemToCart(testProduct);

    act(() => {
      result.current.updateQuantity("1", 3);
      result.current.calculateTotal();
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it("should clear cart", () => {
    addItemToCart(testProduct);
    addItemToCart(testProduct2);

    act(() => {
      result.current.clearCart();
      result.current.calculateTotal();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it("should increase quantity when adding existing item", () => {
    addItemToCart(testProduct);
    addItemToCart(testProduct);

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("should calculate total correctly", () => {
    addItemToCart(testProduct);
    addItemToCart(testProduct2);

    expect(result.current.total).toBe(300);
  });
});
