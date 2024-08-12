import { useParams } from "react-router-dom";

import { Product } from "@/entities/product/model";
import { useProductStore } from "@/features/productDetails/model/store";
import { useProductDetails } from "@/features/productDetails/model/useProductDetails";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";

const ProductDetails = () => {
  const { id } = useParams<{ id: Product["id"] }>();

  const { isLoading, error } = useProductDetails(id);
  const { product } = useProductStore();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error instanceof Error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  if (!product.id) {
    return <div className="text-center">No products found.</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Card>
        <CardContent className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-auto rounded-lg"
          />
          <div>
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
            <p className="mb-4 text-xl font-semibold">${product.price}</p>
            <p className="mb-4">{product.description}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => null} className="w-full">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
ProductDetails.displayName = "ProductDetails";

export { ProductDetails };
