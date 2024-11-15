import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onSearch }) {
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = (e) => {
    if (searchItem.trim().length) {
      onSearch(searchItem.trim());
    }
    setSearchItem("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchItem.length > 0) {
        event.preventDefault();
        handleSearch();
      } else {
        event.preventDefault();
      }
    }
  };

  return (
    <div className="container max-w-full flex items-center justify-between py-4 px-6 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Grab it.
        </Link>
      </div>

      {/* Search Section */}
      <div className="flex-grow sm:max-w-md ml-4">
        <form className="flex items-center space-x-2">
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Cart Icon Section */}
      <div className="flex-shrink-0 ml-4">
        <Link to="/cart">
          <img className="w-8 h-8" src="/cart.svg" alt="cart" />
        </Link>
      </div>
    </div>
  );
}
