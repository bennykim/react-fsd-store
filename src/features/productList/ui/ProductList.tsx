import { useProductListStore } from "@/features/productList/model/store";
import { useProducts } from "@/features/productList/model/useProducts";

const ProductList = () => {
  const { isLoading, error } = useProducts();
  const products = useProductListStore((state) => state.products);

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return (
      <div className="text-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );

  if (products.length === 0)
    return <div className="text-center">No products found.</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
ProductList.displayName = "ProductList";

export { ProductList };
