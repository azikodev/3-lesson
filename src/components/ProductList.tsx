// src/components/ProductDetails.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import "./Details.css";

interface Product {
  id: number;
  title: string;
  images: string;
}

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [todos, setTodos] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    if (product) {
      setTodos([...todos, `Bought ${quantity} of ${product.title}`]);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Product Details</h1>
        <FaCartShopping className="text-2xl" />
      </header>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <img className="w-full h-64 object-cover mb-2 rounded-lg" src={product.images} alt={product.title} />
        <p className="text-lg mb-4">Quantity: {quantity}</p>
        <div className="flex items-center space-x-4 mb-4">
          <button
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition-colors duration-200"
            onClick={handleDecrement}
          >
            -
          </button>
          <h1 className="text-xl">{quantity}</h1>
          <button
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition-colors duration-200"
            onClick={handleIncrement}
          >
            +
          </button>
          <button
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors duration-200"
            onClick={handleBuy}
          >
            Buy
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Todo List</h3>
          <ul className="list-disc pl-5">
            {todos.map((todo, index) => (
              <li key={index} className="mb-1">{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
