import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { FaCartShopping } from "react-icons/fa6";

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
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }

  return (
    <div className="centerga">
      <header className="container">
        <nav>
          <h1>Product Details</h1>
          <FaCartShopping />
        </nav>
      </header>
      <div className="App">
        <h2>{product.title}</h2>
        <img className="img" src={product.images} alt={product.title} />
        <p>Quantity: {quantity}</p>
        <div className="flex">
          <button onClick={handleDecrement}>-</button>
          <h1>{quantity}</h1>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleBuy}>Buy</button>
        </div>
        <div>
          <h3>Todo List</h3>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;