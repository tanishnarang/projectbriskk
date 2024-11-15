import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FakeStoreApi from "./fakeStoreApi";

export default function ProductDetail({ products, onAddToCart }) {
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState(null); // Initialize as null
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await FakeStoreApi.fetchProductById(id);
      setNewProduct(fetchedProduct);
      setLoading(false);
    };
    fetchProduct().catch(console.error);
  }, [id]);

  if (!newProduct && !loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-lg font-semibold text-red-500">
          Product not found. Please return to the
          <a href="/" className="text-blue-500 hover:underline ml-1">
            homepage
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 ml-5">
      {loading ? (
        <div class="flex justify-center items-center">
          <div class="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <a
            href="/"
            className="ml-50 mb-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors shadow-md"
          >
            Back to Home
          </a>
          <div className="flex justify-center p-6">
            <div className="w-full md:w-7/10 max-w-screen-lg bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-2/5 flex-shrink-0 h-80 overflow-hidden">
                <img
                  src={newProduct.image}
                  alt={newProduct.title}
                  className="w-full h-full object-contain rounded-md shadow-sm"
                />
              </div>

              {/* Product Information Section */}
              <div className="w-full md:w-3/5 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  <span className="text-purple-600">{newProduct.title}</span>
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {newProduct.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-semibold text-purple-600">
                    ${newProduct.price}
                  </span>
                  <button
                    className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
                    onClick={() => onAddToCart(newProduct)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
