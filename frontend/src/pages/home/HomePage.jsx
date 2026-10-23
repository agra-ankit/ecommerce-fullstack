import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";
export function HomePage({ cart ,loadCart}) {
  const [searchParams] = useSearchParams();
 const search = searchParams.get("search")
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const url = search?`/api/products?search=${search}`:"/api/products"
      const response = await axios.get(url);
      setProducts(response.data);
    };
    loadProducts();
  }, [search]);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <title>Ecommerce Project</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
