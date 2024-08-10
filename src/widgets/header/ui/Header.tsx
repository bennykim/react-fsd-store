import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          FSD Store
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
Header.displayName = "Header";

export { Header };
