import axios from "axios";

const fetchAllProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

const fetchProductById = async (id) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

const fetchProductBySearchQuery = async (query) => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

const FakeStoreApi = {
  fetchAllProducts,
  fetchProductById,
  fetchProductBySearchQuery,
};

export default FakeStoreApi;
