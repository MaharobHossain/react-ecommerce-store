
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home({ handleAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        }));

        console.log("API Products:", formattedProducts);
        setApiProducts(formattedProducts);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <main>
        <h1>Our Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main>
        <h1>Our Products</h1>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </main>
    );
  }

  // Search and category filtering
  const filteredProducts = apiProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "All" ||
        product.category === selectedCategory
    );

  // Price sorting
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
    <main>
      <h1 id="products">Our Products</h1>

      <div className="product-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
                onAddToCart={() => handleAddToCart(product)}
              />

              <Link to={`/products/${product.id}`}>
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </main>
  );
}

export default Home;
