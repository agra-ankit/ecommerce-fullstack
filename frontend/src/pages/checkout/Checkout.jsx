import { CheckoutHeader } from "./CheckoutHeader";
import "./Checkout.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
export function Checkout({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setpaymentSummary] = useState(null);

  useEffect(() => {
    const loadDeliveryOptions = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };

    loadDeliveryOptions();
  }, []);
  useEffect(() => {
    const loadPaymentSummary = async () => {
      const response = await axios.get("/api/payment-summary");
      setpaymentSummary(response.data);
    };
    loadPaymentSummary();
  }, [cart]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />}
        </div>
      </div>
    </>
  );
}
