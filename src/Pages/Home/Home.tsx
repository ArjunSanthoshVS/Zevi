/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Home.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  image: string;
}

interface HomeState {
  showSuggestions: boolean;
  popularProducts: Product[];
  searchQuery: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [state, setState] = useState<HomeState>({
    showSuggestions: false,
    popularProducts: [],
    searchQuery: "",
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchQuery: e.target.value });
  };

  const handleSearchSubmit = () => {
    navigate(`/products?query=${state.searchQuery}`);
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
          onChange={handleSearchInputChange}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={handleSearchSubmit}
          style={{cursor:"pointer"}}
        ></i>
      </div>

      <h4 className="all_products" onClick={()=>navigate('/products')}>All Products</h4>

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
