import { useState } from "react";
import FilterComp from "../../Components/FilterComp/FilterComp";
import ProdComp from "../../Components/ProdComp/ProdComp";
import SearchComp from "../../Components/SearchComp/SearchComp";
import "./Results.scss";

interface FilterCriteria {
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedRatings: string[];
}

const Results = () => {

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    selectedCategories: [],
    selectedPriceRanges: [],
    selectedRatings: [],
  });

  return (
    <div className="m-4">
      <SearchComp />
      <div className="d-flex">
        <FilterComp setFilterCriteria={setFilterCriteria} />
        <ProdComp filterCriteria={filterCriteria} />
      </div>
    </div>
  );
};

export default Results;
