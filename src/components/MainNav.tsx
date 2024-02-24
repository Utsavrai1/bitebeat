import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { useState } from "react";
import LoginForm from "@/forms/auth-form/LoginForm";
import SignUpForm from "@/forms/auth-form/SignUpForm";
import {
  useLogInUser,
  useSendOtpToUser,
  useSignUpUser,
  useUserAuthState,
} from "@/api/AuthApi";
import OtpForm from "@/forms/auth-form/OtpForm";
import Cookies from "js-cookie";

const MainNav = () => {
  const { isAuthenticated } = useUserAuthState();
  const [showForm, setShowForm] = useState<{
    login: boolean;
    signUp: boolean;
    otp: boolean;
  }>({ login: false, signUp: false, otp: false });

  const handleFormToggle = (formType: "login" | "signUp" | "otp") => {
    setShowForm((prev) => ({ ...prev, [formType]: !prev[formType] }));
  };

  const handleCloseForm = (formType: "login" | "signUp" | "otp") => {
    setShowForm((prev) => ({ ...prev, [formType]: false }));
  };

  const {
    sendOtp,
    isLoading: sendingOtp,
    isSuccess: otpSendSuccess,
  } = useSendOtpToUser();

  const {
    signUpUser,
    isLoading: signUpLoading,
    isSuccess: signUpSuccess,
  } = useSignUpUser();

  const {
    logInUser,
    isLoading: logInLoading,
    isSuccess: loginInUserSuccess,
  } = useLogInUser();

  const handleLoginSuccess = () => {
    if (loginInUserSuccess) {
      handleCloseForm("login");
    }
  };

  const handleSignUpSuccess = () => {
    if (otpSendSuccess) {
      handleCloseForm("signUp");
      handleFormToggle("otp");
    }
  };

  const handleOtpVerificationSuccess = () => {
    if (signUpSuccess) {
      handleCloseForm("otp");
    }
  };

  return (
    <>
      <span className="flex space-x-2 items-center">
        {isAuthenticated ? (
          <UserNameMenu />
        ) : (
          <>
            <Button
              variant="ghost"
              className="font-bold hover:text-red-500 hover:bg-white"
              onClick={() => handleFormToggle("login")}
            >
              Log In
            </Button>
            <Button
              variant="ghost"
              className="font-bold hover:text-red-500 hover:bg-white"
              onClick={() => handleFormToggle("signUp")}
            >
              Sign Up
            </Button>
          </>
        )}
      </span>
      <span>
        {showForm.login && (
          <LoginForm
            onClose={() => handleCloseForm("login")}
            onSave={logInUser}
            isLoading={logInLoading}
            onSuccess={handleLoginSuccess}
          />
        )}
        {showForm.signUp && (
          <SignUpForm
            onClose={() => handleCloseForm("signUp")}
            onSave={sendOtp}
            isLoading={sendingOtp}
            onSuccess={handleSignUpSuccess}
          />
        )}
        {showForm.otp && (
          <OtpForm
            onClose={() => {
              handleCloseForm("otp");
              Cookies.remove("authToken");
            }}
            onSave={signUpUser}
            isLoading={signUpLoading}
            onSuccess={handleOtpVerificationSuccess}
          />
        )}
      </span>
    </>
  );
};

export default MainNav;
