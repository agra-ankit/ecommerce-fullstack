import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Header } from "../../components/Header";
import "./Orders.css";
import { OrdersGrid } from "./OrdersGrid";
export function Orders({ cart ,loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    loadOrders();
  }, [cart]);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        {orders.length > 0 && (
          <OrdersGrid orders={orders} loadCart={loadCart}/>
        )}
      </div>
    </>
  );
}
