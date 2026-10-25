
import { Link, useParams } from "react-router-dom";

function ProductDetails({ products, handleAddToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main>
        <h1>Product Not Found</h1>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>

      <button onClick={() => handleAddToCart(product)}>
        Add to Cart
      </button>

      <p>
        <Link to="/">Back to Products</Link>
      </p>
    </main>
  );
}

export default ProductDetails;
