import { useMutation, useQuery } from "react-query";
import { useUserAuthState } from "./AuthApi";
import { toast } from "sonner";
import { Order } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine: string;
    city: string;
  };
  restaurantId: string;
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useUserAuthState();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useUserAuthState();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
