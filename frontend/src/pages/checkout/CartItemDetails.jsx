import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";
export function CartItemDetails({ cartItem, loadCart }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.product.id}`);
    await loadCart();
  };
  const updateQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };
  const updateCartItemQuantity = async () => {
    setIsUpdating(true);
    try {
      if (quantity === 0) {
        await deleteCartItem();
      } else {
        await axios.put(`/api/cart-items/${cartItem.product.id}`, {
          quantity,
        });
        await loadCart();
        setIsEditing(false);//only leave edit mode if everything succeded as if req failse back to editing mode as we turn off updating mode 
      }
    } catch (error) {
      console.log("Failed to update cart item:", error);
    } finally {
      setIsUpdating(false);
      
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateCartItemQuantity();
    } else if (event.key === "Escape") {
      setIsEditing(false);
      setQuantity(cartItem.quantity);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isEditing ? (
              <input
                type="text"
                onChange={updateQuantity}
                value={quantity}
                onKeyDown={handleKeyDown}
                disabled={isUpdating}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={() => {
              if (isUpdating) return;
              if (isEditing) {
                updateCartItemQuantity();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isUpdating ? "Saving..." : isEditing ? "Save" : "Update"}
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={isUpdating ? undefined : deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
