import { useEffect, useState } from "react";
import "../Load_More_Button/LoadMore.css";

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }
    } catch (event) {
      console.log(event);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) {
      setDisableBtn(true);
    }
  }, [products]);

  if (loading) {
    return <div>Loading Data... Please Wait...</div>;
  }

  return (
    <div>
      <h1>Alex's Products Program</h1>
      <div className="loadMoreContainer">
        <div className="productContainer">
          {products && products.length
            ? products.map((item) => (
                <div className="product" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              ))
            : null}
        </div>
        <div className="btnContainer">
          <button disabled={disableBtn} onClick={() => setCount(count + 1)}>
            Load More Products
          </button>
          {disableBtn ? <p>You have reached 100 products</p> : null}
        </div>
      </div>
    </div>
  );
};

export default LoadMoreData;
