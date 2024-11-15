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
import { useState } from "react";

export default function App() {
  const navigate = useNavigate();
  const onSearch = (searchItem) => {
    navigate(`/?${createSearchParams({ q: searchItem })}`);
  };

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

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
      <Navbar onSearch={onSearch} />

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
      </Routes>
    </div>
  );
}
