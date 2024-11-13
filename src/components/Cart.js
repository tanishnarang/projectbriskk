import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi"; // Importing trash icon

export default function Cart({
  cartItems = [],
  removeFromCart,
  updateQuantity,
}) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const handleIncrease = (id) => {
    updateQuantity(id, 1);
  };

  const handleDecrease = (id, quantity) => {
    if (quantity < 1) {
      updateQuantity(id, -1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>

      {cartItems.length > 0 ? (
        <div>
          <ul className="mb-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border-b border-gray-200"
              >
                {/* Product Image and Name */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-md"
                  />
                  <span className="text-lg font-medium">{item.title}</span>
                </div>

                {/* Price, Quantity and Delete Button */}
                <div className="flex items-center gap-20">
                  <div className="flex items-center justify-center gap-2 border px-3 rounded-md">
                    {/* Increase Button */}
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="text-gray-600 hover:text-gray-800 font-bold text-xl w-8 h-8 flex justify-center items-center"
                    >
                      +
                    </button>

                    {/* Quantity Display */}
                    <span className="text-lg font-medium">{item.quantity}</span>

                    {/* Decrease Button */}
                    <button
                      onClick={() => handleDecrease(item.id, item.quantity)}
                      className="text-gray-600 hover:text-gray-800 font-bold text-xl w-8 h-8 flex justify-center items-center"
                    >
                      -
                    </button>
                  </div>

                  {/* Price and Delete Button */}
                  <span className="text-lg font-semibold text-gray-700">
                    ${item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Amount Display */}
          <div className="flex justify-between items-center pt-4 mt-6">
            <span className="text-xl font-semibold">Total Amount:</span>
            <span className="text-xl font-bold text-purple-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <button className="w-full mt-6 px-4 py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p className="text-lg text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
