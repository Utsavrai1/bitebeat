import { Restaurant } from "@/types";
import { Banknote, Clock } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restaurant: Restaurant;
};

const TopRestaurantCard = ({ restaurant }: Props) => {
  const displayedCuisines = restaurant.cuisines.slice(0, 3);

  return (
    <Link to={`/detail/${restaurant._id}`}>
      <div className="rounded overflow-hidden shadow-lg flex flex-col h-full w-full md:w-72">
        <img
          className="object-cover w-full h-40 md:h-64"
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
        />
        <div className="px-4 py-4">
          <div className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2">
            {restaurant.restaurantName}
          </div>
          <div className="flex flex-wrap">
            {displayedCuisines.map((cuisine, index) => (
              <div
                key={index}
                className="mr-2 mb-2 px-2 py-1 rounded-full bg-gray-200 text-sm text-gray-800 whitespace-nowrap overflow-hidden overflow-ellipsis"
                style={{ maxWidth: "calc(33.333% - 0.5rem)" }}
                title={cuisine}
              >
                {cuisine}
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span className="py-1 text-xs font-regular text-green-600 mr-1 flex flex-row items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="ml-1">
              {restaurant.estimatedDeliveryTime} mins
            </span>
          </span>
          <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            <Banknote className="h-4 w-4 mr-1" />
            <span className="mr-1">
              Delivery from ₹{(restaurant.deliveryPrice / 100).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TopRestaurantCard;
