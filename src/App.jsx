
function Header() {
  return (
    <header>
      <h2>ShopEasy</h2>
      <nav>
        <a href="/">Home</a>{" "}
        <a href="/products">Products</a>{" "}
        <a href="/cart">Cart</a>
      </nav>
    </header>
  );
}

function ProductCard({ name, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

function App() {
  const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Sneakers", price: 50 },
    { id: 3, name: "Backpack", price: 35 },
    { id: 4, name: "Headphones", price: 40 },
  ];

  return (
    <div>
      <Header />
      <h1>Our Products</h1>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default App;
