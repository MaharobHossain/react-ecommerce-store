
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: "T-Shirt", price: 20, category: "Clothing" },
    { id: 2, name: "Sneakers", price: 50, category: "Shoes" },
    { id: 3, name: "Backpack", price: 35, category: "Accessories" },
    { id: 4, name: "Headphones", price: 40, category: "Electronics" },
    { id: 5, name: "Smart Watch", price: 60, category: "Electronics" },
  ];

  function handleAddToCart(product) {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
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

  function removeFromCart(productId) {
    setCartItems((items) =>
      items.filter((item) => item.id !== productId)
    );
  }

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h2>ShopEasy</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/#products">Products</Link>
            <Link to="/cart">Cart ({cartCount})</Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                handleAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetails
                products={products}
                handleAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="*"
            element={
              <main>
                <h1>Page Not Found</h1>
                <Link to="/">Back to Home</Link>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
