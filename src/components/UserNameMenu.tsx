import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useUserAuthState } from "@/api/AuthApi";
import { useGetMyUser } from "@/api/MyUserApi";

const UsernameMenu = () => {
  const { logOut } = useUserAuthState();
  const { currentUser, isLoading } = useGetMyUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-red-500 gap-2">
        <CircleUserRound className="text-red-500" />
        {!isLoading ? currentUser?.name : "Loading"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!isLoading && currentUser?.userType == "seller" && (
          <DropdownMenuItem>
            <Link
              to="/manage-restaurant"
              className="font-bold hover:text-red-500"
            >
              Manage Restaurant
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-red-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Separator />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => logOut()}
            className="flex flex-1 font-bold bg-red-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
