import { useGetMyUser } from "@/api/MyUserApi";

const Footer = () => {
  const { currentUser, isLoading } = useGetMyUser();

  return (
    <div className="bg-red-500 py-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-tight">
          BiteBeat.com
        </span>
        <span className="text-white text-sm tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Term of Service</span>
          {isLoading ? (
            <></>
          ) : currentUser?.userType === "customer" ? (
            <span>Sell on BiteBeat.com</span>
          ) : (
            <></>
          )}
        </span>
      </div>
    </div>
  );
};

export default Footer;
