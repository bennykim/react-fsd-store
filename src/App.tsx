import { Route, Routes } from "react-router-dom";

import { Providers } from "@/app/providers";
import { Home } from "@/pages/home/ui/Home";
import { Footer } from "@/widgets/footer/ui/Footer";
import { Header } from "@/widgets/header/ui/Header";

function App() {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}

export default App;
