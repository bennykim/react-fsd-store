import { ProductList } from "@/features/productList/ui/ProductList";

const HomePage = () => {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="my-8 text-3xl font-bold">Home</h1>
      <ProductList />
    </div>
  );
};
HomePage.displayName = "HomePage";

export { HomePage };
