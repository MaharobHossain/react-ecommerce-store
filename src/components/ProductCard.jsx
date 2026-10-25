
function ProductCard({ name, price }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span>🛍️</span>
      </div>

      <div className="product-info">
        <h3>{name}</h3>

        <p className="product-price">${price.toFixed(2)}</p>

        <button className="add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
