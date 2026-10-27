
import { useState } from "react";

function ProductCard({ name, price, image, onAddToCart }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    onAddToCart();
    setAdded(true);
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <span>🛍️</span>
        )}
      </div>

      <div className="product-info">
        <h3>{name}</h3>

        <p className="product-price">
          ${price.toFixed(2)}
        </p>

        <button
          className="add-to-cart"
          onClick={handleAddToCart}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
