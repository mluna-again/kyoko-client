import Option from "./Option";
import ShirtRating from "./ShirtRating";

const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34];
const LINEAR = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const POWER_OF_TWO = [2, 4, 8, 16, 32, 64, 128, 256, 512];
const MULTIPLES_OF_TWO = [2, 4, 6, 8, 10, 12, 14, 16, 18];
const OPTIONS: any = {
  fibonacci: FIBONACCI,
  linear: LINEAR,
  power_of_two: POWER_OF_TWO,
  multiples_of_two: MULTIPLES_OF_TWO,
};

type Props = {
  optionsType: string;
  selectedOption?: number;
  selectionHandler: any;
  gameOver: boolean;
  ratingType?: string;
};
const Rating = ({
  optionsType,
  selectedOption,
  selectionHandler,
  gameOver,
  ratingType,
}: Props) => {
  if (ratingType === "shirts") {
    return (
      <ShirtRating
        selected={selectedOption}
        onChange={selectionHandler}
        gameOver={gameOver}
      />
    );
  }

  return OPTIONS[optionsType].map((opt: any) => (
    <Option
      selected={opt === selectedOption}
      key={opt}
      value={opt}
      onChange={selectionHandler}
      gameOver={gameOver}
    />
  ));
};

export default Rating;
