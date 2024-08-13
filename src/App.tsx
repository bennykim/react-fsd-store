import { Route, Routes } from "react-router-dom";

import { Providers } from "@/app/providers";
import { CartPage } from "@/pages/cart/ui/CartPage";
import { HomePage } from "@/pages/home/ui/HomePage";
import { ProductPage } from "@/pages/product/ui/ProductPage";
import { Footer } from "@/widgets/footer/ui/Footer";
import { Header } from "@/widgets/header/ui/Header";

function App() {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}

export default App;
