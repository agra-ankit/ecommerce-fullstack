import dayjs from "dayjs";
import buyAgain from "../../assets/images/icons/buy-again.png";
import { Fragment } from "react";
import { Link } from "react-router";
import axios from "axios";
export function OrderDetailsGrid({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((productItem) => {
        const addToCart = async () => {
          await axios.post("/api/cart-items", {
            productId: productItem.productId,
            quantity: 1,
          });
          await loadCart();
        };
        return (
          <Fragment key={productItem.productId}>
            <div className="product-image-container">
              <img src={productItem.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name"></div>
              <div className="product-delivery-date">
                Arriving on:
                {dayjs(productItem.estimatedDeliveryTimeMs).format(
                  " dddd, MMMM D",
                )}
              </div>
              <div className="product-quantity">
                Quantity: {productItem.quantity}
              </div>
              <button className="buy-again-button button-primary"
              onClick={addToCart}>
                <img className="buy-again-icon" src={buyAgain} />
                <span className="buy-again-message">
                  Add to Cart
                </span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${productItem.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
