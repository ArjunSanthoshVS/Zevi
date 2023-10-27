import OneStar from "./OneStar";
import TwoStars from "./TwoStar";
import ThreeStars from "./ThreeStar";
import FourStars from "./FourStar";
import FiveStars from "./FiveStar";

const RatingStars = ({ rate }: { rate: number }) => {
  if (rate >= 0 && rate < 1) {
    return <OneStar />;
  } else if (rate >= 1 && rate < 2) {
    return <TwoStars />;
  } else if (rate >= 2 && rate < 3) {
    return <ThreeStars />;
  } else if (rate >= 3 && rate < 4) {
    return <FourStars />;
  } else if (rate >= 4 && rate <= 5) {
    return <FiveStars />;
  } else {
    return null;
  }
};

export default RatingStars;
