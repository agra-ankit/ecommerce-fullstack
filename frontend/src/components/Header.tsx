import { NavLink, useNavigate } from 'react-router';
import { useState, type KeyboardEvent, type ChangeEvent } from 'react';
import './Header.css';
import cartIcon from '../assets/images/icons/cart-icon.png';
import logoWhite from '../assets/images/logo.png';
import mobileLogoWhite from '../assets/images/mobile-logo-white.png';
import searchIcon from '../assets/images/icons/search-icon.png';

export type CartItem = {
  productId: string;
  quantity: number;
  deliveryOptionId: string;
};

export type HeaderProps = {
  cart: CartItem[];
};

export function Header({ cart }: HeaderProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const searchProduct = () => {
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  const doSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchProduct();

    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logoWhite} alt="Logo" />
          <img className="mobile-logo" src={mobileLogoWhite} alt="Logo" />
        </NavLink>
     
      </div>

      <div className="middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search" 
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
          onKeyDown={doSearch}
        />

        <button className="search-button" onClick={searchProduct}>
          <img className="search-icon" src={searchIcon} alt="Search" />
        </button>
       
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} alt="Cart" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
