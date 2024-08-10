import { ProductList } from "@/features/productList/ui/ProductList";

const Home = () => {
  return (
    <div className="container px-4 mx-auto">
      <h1 className="my-8 text-3xl font-bold">Home</h1>
      <ProductList />
    </div>
  );
};
Home.displayName = "Home";

export { Home };
