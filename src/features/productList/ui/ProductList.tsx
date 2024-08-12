import { useProductListStore } from "@/features/productList/model/store";
import { useProducts } from "@/features/productList/model/useProducts";
import { ProductCard } from "@/widgets/productCard/ProductCard";

const ProductList = () => {
  const { isLoading, error } = useProducts();
  const { products } = useProductListStore();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error instanceof Error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
ProductList.displayName = "ProductList";

export { ProductList };
