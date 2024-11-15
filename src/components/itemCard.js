import { Link } from "react-router-dom";

export default function ItemCard({ data, handleAddToCart }) {
  const { id, image, brand, title, price } = data;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-purple-400 transition-shadow duration-300">
      <div className="image mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded-md"
        />
      </div>
      <div className="title mb-2">
        <Link
          to={`/product/${id}`}
          className="text-lg text-white-800 hover:text-purple-600"
        >
          <span>{brand}</span> {title}
        </Link>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xl text-black-600">${price}</span>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-800 transition-colors"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
