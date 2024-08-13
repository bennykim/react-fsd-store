import { Fragment } from "react";
import { Link } from "react-router-dom";

import { useCartStore } from "@/features/cart/model/store";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <Card>
          <CardContent className="p-6">
            {items.map((item, index) => (
              <Fragment key={item.id}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-24 h-24 rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="ml-4"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </Fragment>
            ))}
          </CardContent>
          <CardFooter className="flex-col">
            <div className="flex justify-between w-full mb-4 text-lg font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex w-full space-x-4">
              <Button variant="outline" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
              <Button className="w-full">Checkout</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
Cart.displayName = "Cart";

export { Cart };
