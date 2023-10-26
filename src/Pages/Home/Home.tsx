import "./Home.scss";
const Home = () => {
  return (
    <>
      <img className="background_img img-fluid" src="/Backgrond.jpg" alt="" />
      <img className="home_logo mt-3" src="/zevi.webp" alt="" />
      <div className="search_bar m-auto">
          <input type="text" className="" placeholder="Search"/>
          <i className="fa-solid fa-magnifying-glass search_icon"></i>
      </div>
    </>
  );
};

export default Home;
