import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetails";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function App() {
  const products = [
    {
      id: 1,
      image: "images/airforce1.png",
      title: "AirForce1",
      brand: "Nike",
      price: 200,
      description: "Great quality of shoe with a nike brand logo on sides",
      review: "Great quality",
    },
    {
      id: 2,
      title: "AirForce2",
      image: "images/airforce2.png",
      brand: "Nike",
      price: 250,
      description: "Great quality of shoe with a nike brand logo on sides",
      review: "Best quality",
    },
    {
      id: 3,
      title: "AirForce3",
      image: "images/airforce3.jpg",
      brand: "Nike",
      price: 300,
      description: "Great quality of shoe with a nike brand logo on sides",
      review: "Over Priced",
    },
  ];

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
      <Navbar />

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
