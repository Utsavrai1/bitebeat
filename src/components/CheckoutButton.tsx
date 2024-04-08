import { useUserAuthState } from "@/api/AuthApi";
import { Button } from "./ui/button";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import LoadingButton from "./LoadingButton";
import CheckoutForm from "@/forms/checkout-form/CheckOutForm";
import { useState } from "react";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  isLoading: Boolean;
};

const CheckoutButton = ({ onCheckout, isLoading }: Props) => {
  const { isAuthenticated } = useUserAuthState();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const toggleCheckoutForm = () => {
    setShowCheckoutForm(!showCheckoutForm);
  };

  if (!isAuthenticated) {
    return (
      <Button disabled={true} className="bg-red-500 flex-1">
        Login to checkout
      </Button>
    );
  }

  if (!currentUser || isLoading) {
    return <LoadingButton className="w-full p-4" />;
  }

  return (
    <>
      <Button onClick={toggleCheckoutForm} className="bg-red-500 flex-1">
        Go to checkout
      </Button>
      {showCheckoutForm && (
        <CheckoutForm
          currentUser={currentUser}
          isLoading={isGetUserLoading}
          onSave={onCheckout}
          onClose={toggleCheckoutForm}
        ></CheckoutForm>
      )}
    </>
  );
};

export default CheckoutButton;
