import ItemCard from "./itemCard";
import { useEffect, useState } from "react";
import fakeStoreApi from "./fakeStoreApi";
import { useSearchParams } from "react-router-dom";

export default function ProductList({ onAddToCart }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useSearchParams();

  const searchItems = query.get("q");
  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = searchItems
        ? await fakeStoreApi.fetchProductBySearchQuery(searchItems)
        : await fakeStoreApi.fetchAllProducts();
      setProducts(products);
      setLoading(false);
    };
    fetchProducts().catch(console.error);
  }, [searchItems]);

  if (!loading && searchItems && !products.length) {
    return (
      <div className="container mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          No products found matching your query.
        </h1>
        <p className="text-gray-500">
          Try searching for something else or return to the
          <a href="/" className="text-purple-600 hover:underline ml-1">
            homepage
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="heading mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ItemCard
                key={product.id}
                data={product}
                handleAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
