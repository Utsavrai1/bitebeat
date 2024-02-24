import { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type SignUpUserRequest = {
  otp: string;
};

export const useSignUpUser = () => {
  const signUpUserRequest = async (user: SignUpUserRequest) => {
    const accessToken = Cookies.get("authToken");

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error);
    }

    return res;
  };

  const {
    data: userData,
    mutateAsync: signUpUser,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(signUpUserRequest);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User SignUp Successfully");
      Cookies.remove("authToken");
      Cookies.set("userAccessToken", userData.token);
      reset();
    }

    if (error) {
      toast.error(error.toString());
      reset();
    }
  }, [isSuccess, error, reset]);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return {
    signUpUser,
    isLoading,
    isSuccess,
  };
};

type SendOtpRequest = {
  name: string;
  email: string;
  password: string;
};

export const useSendOtpToUser = () => {
  const sendOtpRequest = async (user: SendOtpRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error);
    }
    return res;
  };

  const {
    data: userData,
    mutateAsync: sendOtp,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(sendOtpRequest);

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("authToken", userData.token);
      toast.success("Otp Send Successfully");
      reset();
    }

    if (error) {
      toast.error(error.toString());
      reset();
    }
  }, [isSuccess, error, reset]);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return {
    sendOtp,
    isLoading,
    isSuccess,
  };
};

type LoginUserRequest = {
  email: string;
  password: string;
};

export const useLogInUser = () => {
  const logInUserRequest = async (user: LoginUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error);
    }
    return res;
  };

  const {
    data: userData,
    mutateAsync: logInUser,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(logInUserRequest);

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("userAccessToken", userData.token);

      toast.success("User LogIn Successfully");
      reset();
    }

    if (error) {
      toast.error(error.toString());
      reset();
    }
  }, [isSuccess, error, reset]);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return {
    logInUser,
    isLoading,
    isSuccess,
  };
};

export const useUserAuthState = () => {
  var isAuthenticated = false;
  const navigate = useNavigate();

  if (Cookies.get("userAccessToken")) {
    isAuthenticated = true;
  }

  const logOut = async () => {
    Cookies.remove("userAccessToken");
    isAuthenticated = false;
    navigate("/");
  };

  const getAccessTokenSilently = (): string => {
    const token = Cookies.get("userAccessToken");
    return token || "";
  };

  return {
    isAuthenticated,
    logOut,
    getAccessTokenSilently,
  };
};
