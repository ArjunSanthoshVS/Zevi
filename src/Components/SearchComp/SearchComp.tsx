import { useState } from 'react';
import './SearchComp.scss'
import { useNavigate } from 'react-router-dom';

interface SearchState {
  searchQuery: string;
}

const SearchComp = () => {
    const navigate = useNavigate();

  const [state, setState] = useState<SearchState>({
    searchQuery: "",
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchQuery: e.target.value });
  };

  const handleSearchSubmit = () => {
    navigate(`/products?query=${state.searchQuery}`);
  };

  return (
    <div className="mt-4 d-flex align-items-center">
      <div className="results_search_bar m-auto px-4">
        <input
          className="search_input"
          type="text"
          placeholder="Search"
          onChange={handleSearchInputChange}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={handleSearchSubmit}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
      <img className="results_logo me-3" src="/zevi.webp" alt="" />
    </div>
  );
}

export default SearchComp
