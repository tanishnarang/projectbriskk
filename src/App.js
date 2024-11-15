import {
  Routes,
  Route,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetails";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import PaymentPage from "./components/Payment";

export default function App() {
  const navigate = useNavigate();
  const onSearch = (searchItem) => {
    navigate(`/?${createSearchParams({ q: searchItem })}`);
  };

  const products = [];

  const [cart, setCart] = useState([]);

  const [cartCount, setCartCount] = useState(cart.length);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const onAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  return (
    <div>
      <Navbar
        onSearch={onSearch}
        cartCount={cartCount < 9 ? cartCount : "9+"}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProductList products={products} onAddToCart={onAddToCart} />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail products={products} onAddToCart={onAddToCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}
