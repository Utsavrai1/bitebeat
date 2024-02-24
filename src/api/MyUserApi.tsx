import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "@/types";
import { useUserAuthState } from "./AuthApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useUserAuthState();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = getAccessTokenSilently();
    if (!accessToken) {
      throw new Error("Failed to get user");
    }
    const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  };

  const { data: currentUser, isLoading } = useQuery(
    "fetchCurrentUser",
    getMyUserRequest
  );

  return {
    currentUser,
    isLoading,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useUserAuthState();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User Profile Updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};
