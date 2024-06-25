import { useState } from "react";
import { Rating } from "@smastrom/react-rating";

type Props = {
  readonly: boolean;
  initialRating: number;
};

const Rate = ({ readonly, initialRating, ...props }: Props) => {
  const [rating, setRating] = useState(initialRating); // Initial value

  return (
    <Rating
      style={{ maxWidth: 150 }}
      value={rating}
      onChange={setRating}
      readOnly={readonly}
      {...props}
    />
  );
};

export default Rate;
