import { useState } from "react";
import { formatMoney } from "../../utils/money";
import checkMark from "../../assets/images/icons/checkmark.png";
import axios from "axios";
export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [popup, setPopup] = useState(false);
  const showAddedPopUp = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 2000);
  };
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    loadCart();
    showAddedPopUp();
    setQuantity(1);
  };
  const selectQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };
  return (
    <div className="product-container"
    data-testid="product-container">
      <div className="product-image-container">
        <img className="product-image" 
        data-testid='product-image'
        src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid='product-rating-stars'
        />
        <div 
        className="product-rating-count link-primary"
        data-testid="product-rating-count"
        >
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{opacity:popup?1:0}}>
        <img src={checkMark} />
        Added
      </div>

      <button
       className="add-to-cart-button button-primary" 
       onClick={addToCart}
       data-testid="add-to-cart-button"
       >
        Add to Cart
      </button>
    </div>
  );
}
