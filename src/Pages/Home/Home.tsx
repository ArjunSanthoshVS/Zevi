import { useState, useEffect } from "react";
import "./Home.scss";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  image: string;
}

interface HomeState {
  showSuggestions: boolean;
  popularProducts: Product[];
}

const Home: React.FC = () => {
  const [state, setState] = useState<HomeState>({
    showSuggestions: false,
    popularProducts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      const randomProducts = getRandomProducts(response.data, 4);
      setState({ ...state, popularProducts: randomProducts });
    };
    fetchData();
  }, []);

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const randomProducts: Product[] = [];
    while (randomProducts.length < count) {
      const randomIndex = Math.floor(Math.random() * products.length);
      randomProducts.push(products[randomIndex]);
    }
    return randomProducts;
  };

  const handleSearchBarClick = () => {
    setState({ ...state, showSuggestions: true });
  };
  return (
    <>
      <img className="background_img img-fluid" src="/Backgrond.jpg" alt="" />
      <img className="home_logo mt-3" src="/zevi.webp" alt="" />
      <div className="search_bar m-auto">
        <input
          className="search_input"
          type="text"
          placeholder="Search"
          onClick={handleSearchBarClick}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      {state.showSuggestions && (
        <div className="suggestions justify-content-center d-block">
          {state.popularProducts.length > 0 && (
            <div className="popular-products m-auto">
              <h2 className="text-start m-3">Popular Products</h2>
              <div className="product-list">
                {state.popularProducts.map((product) => (
                  <div key={product.id} className="product">
                    <img
                      className="w-25"
                      src={product.image}
                      alt={product.title}
                    />
                    <p>{product.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
