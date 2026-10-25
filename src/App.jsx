
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
  setCartItems((items) => [...items, product]);
}

  return (
    <div>
      <Header />

      
{cartItems.length > 0 && (
  <section className="cart-section">
    <h2>Your Cart</h2>

    {cartItems.map((item, index) => (
      <div className="cart-item" key={`${item.id}-${index}`}>
        <span>{item.name}</span>
        <span>${item.price.toFixed(2)}</span>

        <button
          onClick={() =>
            setCartItems((items) =>
              items.filter((_, i) => i !== index)
            )
          }
        >
          Remove
        </button>
      </div>
    ))}
  </section>
)}


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
