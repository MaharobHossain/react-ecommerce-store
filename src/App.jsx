
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Sneakers", price: 50 },
    { id: 3, name: "Backpack", price: 35 },
    { id: 4, name: "Headphones", price: 40 },
    { id: 5, name: "Smart Watch", price: 60 },
  ];

  return (
    <div>
      <Header />

      <h1>Our Products</h1>

      <div className="product-grid">
  {products.map((product) => (
    <ProductCard
      key={product.id}
      name={product.name}
      price={product.price}
    />
  ))}
</div>
    </div>
  );
}

export default App;
