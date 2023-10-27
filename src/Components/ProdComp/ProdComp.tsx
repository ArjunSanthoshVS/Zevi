import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./ProdComp.scss";
import RatingStars from "../RatingComp/RatingStars";
import ProdLoading from "../Loading/ProdLoading";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
}

interface ProdCompProps {
  filterCriteria: {
    selectedCategories: string[];
    selectedPriceRanges: string[];
    selectedRatings: string[];
  };
}

const ProdComp: React.FC<ProdCompProps> = ({ filterCriteria }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]); // Store product IDs in the wishlist

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

   const toggleWishlist = (productId: number) => {
     if (wishlist.includes(productId)) {
       // Remove from wishlist
       setWishlist(wishlist.filter((id) => id !== productId));
     } else {
       // Add to wishlist
       setWishlist([...wishlist, productId]);
     }
   };

  // Filter products based on filter criteria
  const filteredProducts = products.filter((product) => {
    const { selectedCategories, selectedPriceRanges, selectedRatings } =
      filterCriteria;

    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      console.log(selectedPriceRanges);

      const price = product.price * 100;
      console.log(price);

      if (
        !selectedPriceRanges.some((range) => {
          const [min, max] = range.split("to").map(Number);
          return price >= min && price <= max;
        })
      ) {
        return false;
      }
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      const normalizedRating = Math.ceil(product.rating.rate);
      if (!selectedRatings.includes(normalizedRating.toString())) {
        return false;
      }
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / 8);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );
  return (
    <Container className="mt-5">
      {loading ? (
        <ProdLoading />
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4}>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((item) => (
                <Col key={item.id}>
                  <Card className="m-3">
                    <Card.Img
                      className="prod_img m-auto mt-2 p-relative"
                      src={item.image}
                      alt={item.title}
                    />
                    <i
                      className={
                        wishlist.includes(item.id)
                          ? "fa-solid fa-heart wish_icon"
                          : "fa-regular fa-heart wish_icon"
                      }
                      style={{
                        color: wishlist.includes(item.id) ? "#ff0000" : "",
                        fontSize: "30px",
                      }}
                      onClick={() => toggleWishlist(item.id)}
                    ></i>
                    <h4 className="view_product">View Product</h4>
                    <Card.Body>
                      <Card.Title className="text-start">
                        {item.title}
                      </Card.Title>
                      <h5 className="text-start">
                        <b>Rs. {item.price * 100}</b>
                      </h5>
                      <h6 className="text-start">
                        <RatingStars rate={item.rating.rate} />
                        <span className="ms-2" style={{ fontWeight: "100" }}>
                          ({item.rating.count})
                        </span>
                      </h6>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <h1>No Products..!</h1>
            )}
          </Row>
          {totalPages > 1 && (
            <div className="pagination justify-content-end mt-5">
              <button
                className="btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ProdComp;
