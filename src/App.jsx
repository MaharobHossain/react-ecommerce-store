
import { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Sneakers", price: 50 },
    { id: 3, name: "Backpack", price: 35 },
    { id: 4, name: "Headphones", price: 40 },
    { id: 5, name: "Smart Watch", price: 60 },
  ];

  function handleAddToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, change) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Header />

      <section className="cart-section">
        <h2>Your Cart ({cartItems.length} products)</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>{item.name}</span>

                <span>${item.price.toFixed(2)}</span>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>

                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            ))}

            <h3 className="cart-total">
              Total: ${cartTotal.toFixed(2)}
            </h3>
          </>
        )}
      </section>

      <h1>Our Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
