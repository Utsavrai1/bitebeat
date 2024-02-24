import logo from "../assets/logo.svg";

const Logo = () => {
  return (
    <div>
      <img src={logo} className="w-full max-h-[150px] object-contain" />
    </div>
  );
};

export default Logo;
