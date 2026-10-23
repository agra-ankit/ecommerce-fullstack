import { it, expect, describe, vi, beforeEach } from "vitest";
import { Product } from "./Product";
import { render, screen } from "@testing-library/react";
import { formatMoney } from "../../utils/money";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127,
    },
    priceCents: 2095,
    keywords: ["sports", "basketballs"],
  },
];

describe("Product component", () => {
  let loadCart;
  beforeEach(() => {
    vi.clearAllMocks();
    loadCart = vi.fn();
  });

  products.forEach((product) => {
    it(`displays ${product.id} correctly`, () => {
      render(<Product product={product} loadCart={loadCart} />);

      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(
        screen.getByText(formatMoney(product.priceCents)),
      ).toBeInTheDocument();
      expect(screen.getByTestId("product-image")).toHaveAttribute(
        "src",
        product.image,
      );
      expect(screen.getByTestId("product-rating-count")).toHaveTextContent(
        product.rating.count.toString(),
      );
      expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
        "src",
        `images/ratings/rating-${product.rating.stars * 10}.png`,
      );
    });

    it(`adds ${product.id} to the cart`, async () => {
      render(<Product product={product} loadCart={loadCart} />);
      const user = userEvent.setup();
      const addToCartButton = screen.getByTestId("add-to-cart-button");
      await user.click(addToCartButton);

      expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
        productId: product.id,
        quantity: 1,
      });
      expect(loadCart).toHaveBeenCalled();
    });
  });
});
