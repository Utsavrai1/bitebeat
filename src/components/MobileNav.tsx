import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
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
import { useGetMyUser } from "@/api/MyUserApi";

const MobileNav = () => {
  const { isAuthenticated } = useUserAuthState();
  const { currentUser, isLoading } = useGetMyUser();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showSheet, setShowSheet] = useState(true);
  const handleFormVisibility = (formType: string) => {
    setShowLoginForm(formType === "login");
    setShowSignUpForm(formType === "signUp");
    setShowOtpForm(formType === "otp");
    setShowSheet(false);
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
      setShowLoginForm(false);
      setShowSheet(true);
    }
  };

  const handleSignUpSuccess = () => {
    if (otpSendSuccess) {
      setShowSignUpForm(false);
      handleFormVisibility("otp");
    }
  };

  const handleOtpVerificationSuccess = () => {
    if (signUpSuccess) {
      setShowOtpForm(false);
    }
  };

  return (
    <>
      {showSheet && (
        <Sheet>
          <SheetTrigger>
            <Menu className="text-red-500" />
          </SheetTrigger>
          <SheetContent className="space-y-3">
            <SheetTitle>
              {isAuthenticated ? (
                <span className="flex items-center font-bold gap-2">
                  <CircleUserRound className="text-red-500" />
                  {!isLoading ? currentUser?.name : "Loading"}
                </span>
              ) : (
                <span>Welcome to BiteBeat.com!</span>
              )}
            </SheetTitle>
            <Separator />
            <SheetDescription className="flex flex-col gap-4">
              {!isAuthenticated && (
                <>
                  <Button
                    onClick={() => handleFormVisibility("login")}
                    className="flex-1 font-bold bg-red-500"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => handleFormVisibility("signUp")}
                    className="flex-1 font-bold bg-red-500"
                  >
                    Sign Up
                  </Button>
                </>
              )}
              {isAuthenticated && <MobileNavLinks />}
            </SheetDescription>
          </SheetContent>
        </Sheet>
      )}
      {showLoginForm && (
        <LoginForm
          onClose={() => {
            setShowLoginForm(false);
            setShowSheet(true);
          }}
          onSave={logInUser}
          onSuccess={handleLoginSuccess}
          isLoading={logInLoading}
        />
      )}
      {showSignUpForm && (
        <SignUpForm
          onClose={() => {
            setShowSignUpForm(false);
            setShowSheet(true);
          }}
          onSuccess={handleSignUpSuccess}
          onSave={sendOtp}
          isLoading={sendingOtp}
        />
      )}

      {showOtpForm && (
        <OtpForm
          onClose={() => {
            setShowOtpForm(false);
            setShowSheet(true);
            Cookies.remove("authToken");
          }}
          onSave={signUpUser}
          isLoading={signUpLoading}
          onSuccess={handleOtpVerificationSuccess}
        />
      )}
    </>
  );
};

export default MobileNav;
