import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <>
      <div className="relative space-y-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-black"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button className="w-full p-4 border-gray-400" variant="outline">
        <FcGoogle className="mr-2 h-4 w-4" /> Continue with google
      </Button>
    </>
  );
};

export default GoogleButton;
