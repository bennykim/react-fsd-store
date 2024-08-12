import { Link } from "react-router-dom";

import { Product } from "@/entities/product/model";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <Link to={`/product/${product.id}`}>
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h3 className="mt-2 text-sm font-medium">{product.name}</h3>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-lg font-semibold">${product.price}</p>
        <Button variant="secondary" asChild>
          <Link to={`/product/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
ProductCard.displayName = "ProductCard";

export { ProductCard };
