import { useGetMyOrders } from "@/api/OrderApi";
import { LoaderIcons } from "@/components/LoaderIcon";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Rate from "@/components/Rating";
import { useState } from "react";
import RatingForm from "@/forms/rating-form/RatingForm";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  const [showRatingForm, setShowRatingForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderIcons.spinner className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }

  return (
    <div>
      <div className="space-y-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="space-y-10 bg-gray-50 p-10 rounded-lg"
          >
            <OrderStatusHeader order={order} />
            <div className="grid gap-10 md:grid-cols-2">
              <OrderStatusDetail order={order} />
              <AspectRatio ratio={16 / 5}>
                <img
                  src={order.restaurant.imageUrl}
                  className="rounded-md object-cover h-full w-full"
                />
              </AspectRatio>
            </div>
            <div
              className="mt-4"
              onClick={
                order.rating == undefined
                  ? () => {
                      setShowRatingForm(true);
                      setSelectedOrder(order._id);
                      setSelectedRestaurant(order.restaurant._id);
                    }
                  : () => {}
              }
            >
              <Rate
                readonly={true}
                initialRating={
                  order.rating != undefined ? order.rating.rating : 0
                }
              />
            </div>
          </div>
        ))}
      </div>

      {showRatingForm ? (
        <RatingForm
          onClose={() => {
            setShowRatingForm(false);
            setSelectedOrder("");
            setSelectedRestaurant("");
          }}
          restaurantId={selectedRestaurant}
          orderId={selectedOrder}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default OrderStatusPage;
