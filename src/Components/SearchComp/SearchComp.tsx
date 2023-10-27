import './SearchComp.scss'
const SearchComp = () => {
  return (
    <div className="mt-4 d-flex align-items-center">
      <div className="results_search_bar m-auto px-4">
        <input type="text" className="search_input" placeholder="Search" />
        <i className="fa-solid fa-magnifying-glass search_icon"></i>
      </div>
      <img className="results_logo me-3" src="/zevi.webp" alt="" />
    </div>
  );
}

export default SearchComp
