import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  // TODO: Add buttons for first page and last page navigation
  // TODO: Handle too many page numbers being shown at the bottom
  // TODO: Add dropdown for items per page as well

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
      );
      const data = await res.json();

      if (data && data.products) {
        setProducts(data.products);
        setProductCount(data.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleSetPage = (selectedPage) => {
    if (selectedPage > 0 && selectedPage <= Math.ceil(productCount / 10))
      setPage(selectedPage);
  };
  // Frontend Pagination
  // slice((page - 1) * 10, page * 10)

  return (
    <div className="app">
      <div className="app_products">
        {products.map((prod) => {
          return (
            <div className="product" key={prod.id}>
              <img
                src={prod.thumbnail}
                alt={prod.name}
                className="product__thumbnail"
              />
              <div className="product__title">{prod.title}</div>
            </div>
          );
        })}
      </div>
      {productCount > 10 && (
        <div className="pagination">
          <span
            onClick={() => handleSetPage(page - 1)}
            className="pagination__arrow"
          >
            ◀️
          </span>
          {[...Array(Math.ceil(productCount / 10))].map((_, i) => {
            return (
              <span
                key={i}
                className={`
                  pagination__page ${
                    page === i + 1 ? "pagination__page--selected" : ""
                  }`}
                onClick={() => handleSetPage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => handleSetPage(page + 1)}
            className="pagination__arrow"
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
