import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { Checkout } from "./pages/checkout/Checkout";
import { Orders } from "./pages/orders/Orders";
import { Tracking } from "./pages/Tracking";
import { NotFound } from "./pages/NotFound";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  // window.axios=axios; checking reset api (working fine)
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
  };
  useEffect(() => {
    loadCart();
    
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<Checkout cart={cart} loadCart={loadCart}/>} />
      <Route path="orders" element={<Orders cart={cart} loadCart={loadCart}/>} />
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart} />} />
      <Route path="*" element={<NotFound cart={cart} />}></Route>
    </Routes>
  );
}

export default App;
