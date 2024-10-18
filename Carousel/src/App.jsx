import { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=10`);
      const data = await response.json();
      setImages(data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="carousel-container">
      <Carousel images={images} isLoading={loading} />
    </div>
  );
}
