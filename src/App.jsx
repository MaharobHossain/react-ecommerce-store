
import { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");


  
const products = [
  { id: 1, name: "T-Shirt", price: 20, category: "Clothing" },
  { id: 2, name: "Sneakers", price: 50, category: "Shoes" },
  { id: 3, name: "Backpack", price: 35, category: "Accessories" },
  { id: 4, name: "Headphones", price: 40, category: "Electronics" },
  { id: 5, name: "Smart Watch", price: 60, category: "Electronics" },
];


  // Add product to cart
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

  // Update product quantity
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

  // Remove product completely
  function removeFromCart(productId) {
    setCartItems((items) =>
      items.filter((item) => item.id !== productId)
    );
  }

  // Total quantity and total price
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((product) =>
    selectedCategory === "All" ||
    product.category === selectedCategory
  );

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOrder === "low-to-high") {
    return a.price - b.price;
  }

  if (sortOrder === "high-to-low") {
    return b.price - a.price;
  }

  return 0;
});


  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <h2>Your Cart ({cartCount})</h2>

              <button
                className="close-cart"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>

                <button
                  className="continue-shopping"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-drawer-items">
                  {cartItems.map((item) => (
                    <div className="drawer-cart-item" key={item.id}>
                      <div className="drawer-product-info">
                        <strong>{item.name}</strong>

                        <span className="drawer-unit-price">
                          ${item.price.toFixed(2)} each
                        </span>

                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="drawer-item-right">
                        <strong>
                          $
                          {(item.price * item.quantity).toFixed(2)}
                        </strong>

                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-drawer-footer">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>

                    <strong>${cartTotal.toFixed(2)}</strong>
                  </div>

                  <p>
                    Shipping and taxes calculated at checkout.
                  </p>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      alert(
                        "Checkout functionality will be added later."
                      )
                    }
                  >
                    Continue to Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* Products */}
      <main>
        <h1 id="products">Our Products</h1>

        
<div className="product-controls">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <select
    value={selectedCategory}
    onChange={(event) => setSelectedCategory(event.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="Clothing">Clothing</option>
    <option value="Shoes">Shoes</option>
    <option value="Accessories">Accessories</option>
    <option value="Electronics">Electronics</option>
  </select>

  <select
    value={sortOrder}
    onChange={(event) => setSortOrder(event.target.value)}
  >
    <option value="default">Default Sorting</option>
    <option value="low-to-high">Price: Low to High</option>
    <option value="high-to-low">Price: High to Low</option>
  </select>
</div>


        
<div className="product-grid">
  {sortedProducts.length > 0 ? (
    sortedProducts.map((product) => (
      <ProductCard
        key={product.id}
        name={product.name}
        price={product.price}
        onAddToCart={() => handleAddToCart(product)}
      />
    ))
  ) : (
    <p>No products found.</p>
  )}
</div>

      </main>
    </div>
  );
}

export default App;
