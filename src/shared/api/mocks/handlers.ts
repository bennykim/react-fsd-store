import { http, HttpResponse } from "msw";

import { products } from "./data";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json(products, { status: 200 });
  }),
  http.get("/api/products/:id", ({ params }) => {
    const product = products.find((item) => item.id === params.id);

    if (product) {
      return HttpResponse.json(product, { status: 200 });
    } else {
      return HttpResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }
  }),
];
