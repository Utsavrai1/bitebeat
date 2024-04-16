import landingImage from "../assets/landing.png";
import downloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import TopRestaurantCard from "@/components/TopRestaurantCard";
import { useGetTopRestaurant } from "@/api/RestaurantApi";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  const { restaurants, isLoading } = useGetTopRestaurant();

  if (isLoading || !restaurants || restaurants.length == 0) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-red-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search by city or cuisine"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          {!isLoading &&
            restaurants?.map((restaurant) => (
              <TopRestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="Landing Image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the BiteBeat App for faster ordering and personalised
            recommendations
          </span>
          <img src={downloadImage} alt="App Store Image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
