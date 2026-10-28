
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Fetch products once for the whole application
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const formattedProducts = data.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          category: product.category,
          image: product.image,
          description: product.description,
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart or increase its quantity
  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });
  }

  // Increase or decrease quantity
  function updateQuantity(productId, change) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove item from cart
  function removeFromCart(productId) {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId)
    );
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <header className="site-header">
        <Link to="/" className="brand">
          ShopEasy
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              loading={loading}
              error={error}
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
    </BrowserRouter>
  );
}

export default App;
