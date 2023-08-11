import React, { useId } from "react";
import { CartIcon, ClearCartIcon } from "../Icons";

import "./Cart.scss";
import { useCart } from "../../hooks/useCart";

export function CartItem({ thumbnail, title, price, quantity, addToCart, decrementFromCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
      </footer>
      <button onClick={addToCart}>+</button>
      <button onClick={decrementFromCart}>-</button>
    </li>
  );
}

export default function Cart() {
  const cartCheckboxId = useId();

  const { cart, clearCart, addToCart, decrementFromCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => {
            return (
              <CartItem
                key={product.id}
                thumbnail={product.thumbnail}
                price={product.price}
                title={product.title}
                quantity={product.quantity}
                addToCart={() => addToCart(product)}
                decrementFromCart={() => decrementFromCart(product)}
              />
            );
          })}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
