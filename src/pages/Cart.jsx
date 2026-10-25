
import { Link } from "react-router-dom";

function Cart({ cartItems, updateQuantity, removeFromCart }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)} each</p>

            <button onClick={() => updateQuantity(item.id, -1)}>
              −
            </button>

            <span> {item.quantity} </span>

            <button onClick={() => updateQuantity(item.id, 1)}>
              +
            </button>

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Total: ${total.toFixed(2)}</h2>
      <Link to="/">Continue Shopping</Link>
    </main>
  );
}

export default Cart;
