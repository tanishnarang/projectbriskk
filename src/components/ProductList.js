import ItemCard from "./itemCard";

export default function ProductList({ products, onAddToCart }) {
  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  return (
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
  );
}
