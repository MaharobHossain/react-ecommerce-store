function Header({ cartCount, onCartClick }) {
  return (
    <header>
      <h2>ShopEasy</h2>

      <nav>
        <a href="/">Home</a>
        <a href="#products">Products</a>

        <button
          className="header-cart"
          onClick={onCartClick}
        >
          <span>Cart</span>
          <span className="header-cart-count">
            {cartCount}
          </span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
