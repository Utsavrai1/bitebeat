import { toast } from "sonner";
import { useUserAuthState } from "./AuthApi";
import { useMutation } from "react-query";
import { Rating } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRateOrder = () => {
  const { getAccessTokenSilently } = useUserAuthState();

  const rateOrder = async (rating: Rating) => {
    const accessToken = getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/order/rate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rating),
    });
    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error);
    }

    return res;
  };

  const {
    mutateAsync: ratingOrder,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(rateOrder);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    ratingOrder,
    isLoading,
    isSuccess,
  };
};
