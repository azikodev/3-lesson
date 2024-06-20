// src/App.tsx

import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ProductDetails from "../src/components/ProductDetails";  // Ensure correct path

interface Products {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

interface Product {
  id: number;
  title: string;
  images: string;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/details/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

function ProductList() {
  const [products, setProducts] = useState<Products | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDetails = (id: number) => {
    navigate(`/details/${id}`);
  };

  const handleDelete = (id: number) => {
    if (products) {
      const result: Product[] = products.products.filter(
        (product: Product) => product.id !== id
      );
      setProducts({
        ...products,
        products: result,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products &&
          products.products.map((product: Product) => (
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" key={product.id}>
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <img
                className="w-full h-40 object-cover mb-2 rounded-lg"
                src={product.images}
                alt={product.title}
              />
              <div className="flex justify-between">
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors duration-200"
                  onClick={() => handleDetails(product.id)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
