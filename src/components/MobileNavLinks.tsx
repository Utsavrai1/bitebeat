import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserAuthState } from "@/api/AuthApi";

const MobileNavLinks = () => {
  const { logOut } = useUserAuthState();
  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        My Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logOut()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
