import { useEffect, useState } from "react";
import Accordion from "../Accordion/Accordion";
import axios from "axios";
import FiveStar from "../RatingComp/FiveStar";
import FourStar from "../RatingComp/FourStar";
import ThreeStar from "../RatingComp/ThreeStar";
import TwoStar from "../RatingComp/TwoStar";
import OneStar from "../RatingComp/OneStar";
import Loading from "../Loading/Loading";

interface Product {
  category: string;
}

interface FilterCompProps {
  setFilterCriteria: React.Dispatch<
    React.SetStateAction<{
      selectedCategories: string[];
      selectedPriceRanges: string[];
      selectedRatings: string[];
    }>
  >;
}

const FilterComp: React.FC<FilterCompProps> = ({ setFilterCriteria }) => {
  const [loading, setLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    { label: string; min: number; max: number }[]
  >([
    { label: "Under 1000", min: 0, max: 1000 },
    { label: "1000 to 5000", min: 1000, max: 5000 },
    { label: "5000 to 10000", min: 5000, max: 10000 },
    { label: "10000 to 50000", min: 10000, max: 50000 },
    { label: "50000 to 100000", min: 50000, max: 100000 },
    { label: "Above 1 Lakh", min: 100000, max: 99999999999999 },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data: Product[] = response.data;
        const categories = Array.from(
          new Set(data.map((item) => item.category))
        );
        setUniqueCategories(categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  // Handle price range selection
  const handlePriceRangeChange = (range: string) => {
    const updatedPriceRanges = selectedPriceRanges.includes(range)
      ? selectedPriceRanges.filter((r) => r !== range)
      : [...selectedPriceRanges, range];
    setSelectedPriceRanges(updatedPriceRanges);
  };

  // Handle rating selection
  const handleRatingChange = (rating: string) => {
    const updatedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(updatedRatings);
  };

  // Apply the selected filters
  const applyFilters = () => {
    setFilterCriteria({
      selectedCategories,
      selectedPriceRanges,
      selectedRatings,
    });
  };

  return (
    <div style={{ width: "22%" }}>
      <h2 className="my-4">Search Results</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Accordion title="Category">
            {uniqueCategories.map((category) => (
              <div key={category} className="d-flex">
                <input
                  className="category_checkbox"
                  type="checkbox"
                  name="category"
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label>{category}</label>
              </div>
            ))}
          </Accordion>

          <Accordion title="Price Range">
            {priceRanges.map((range, index) => (
              <div key={index} className="d-flex">
                <input
                  type="checkbox"
                  name="price"
                  id={`price${index}`}
                  value={`${range.min} to ${range.max}`}
                  checked={selectedPriceRanges.includes(
                    `${range.min} to ${range.max}`
                  )}
                  onChange={() =>
                    handlePriceRangeChange(`${range.min} to ${range.max}`)
                  }
                />
                <label>{range.label}</label>
              </div>
            ))}
          </Accordion>

          <Accordion title="Rating">
            <div className="d-flex">
              <input
                type="checkbox"
                name="rating"
                id="rating5"
                checked={selectedRatings.includes("5")}
                onChange={() => handleRatingChange("5")}
              />
              <label>
                <FiveStar />
              </label>
            </div>
            <div className="d-flex">
              <input
                type="checkbox"
                name="rating"
                id="rating4"
                checked={selectedRatings.includes("4")}
                onChange={() => handleRatingChange("4")}
              />
              <label>
                <FourStar />
              </label>
            </div>
            <div className="d-flex">
              <input
                type="checkbox"
                name="rating"
                id="rating3"
                checked={selectedRatings.includes("3")}
                onChange={() => handleRatingChange("3")}
              />
              <label>
                <ThreeStar />
              </label>
            </div>
            <div className="d-flex">
              <input
                type="checkbox"
                name="rating"
                id="rating2"
                checked={selectedRatings.includes("2")}
                onChange={() => handleRatingChange("2")}
              />
              <label>
                <TwoStar />
              </label>
            </div>
            <div className="d-flex">
              <input
                type="checkbox"
                name="rating"
                id="rating1"
                checked={selectedRatings.includes("1")}
                onChange={() => handleRatingChange("1")}
              />
              <label>
                <OneStar />
              </label>
            </div>
          </Accordion>
          <button onClick={applyFilters} className="btn btn-primary">
            Apply
          </button>
        </>
      )}
    </div>
  );
};

export default FilterComp;
