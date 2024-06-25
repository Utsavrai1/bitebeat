import { useRateOrder } from "@/api/RatingApi";
import LoadingButton from "@/components/LoadingButton";
import Logo from "@/components/Logo";
import Rate from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }),
  review: z.string().min(3, { message: "Review is required" }),
});

type Props = {
  orderId: string;
  restaurantId: string;
  onClose: () => void;
};

type RatingFormData = z.infer<typeof formSchema>;

const RatingForm = ({ orderId, restaurantId, onClose }: Props) => {
  const { ratingOrder, isLoading, isSuccess } = useRateOrder();

  const handleFormSubmit = async (data: RatingFormData) => {
    const formData: Rating = {
      orderId: orderId,
      restaurtId: restaurantId,
      ...data,
    };

    ratingOrder(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      window.location.reload();
    }
  }, [isSuccess]);

  const form = useForm<RatingFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <Card className="w-[400px]">
        <CardHeader className="relative">
          <Logo />
          <CardTitle className="text-lg">Rate this order</CardTitle>
          <span
            className="close absolute top-0 right-0 m-4 cursor-pointer text-3xl text-gray-700 hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </span>
        </CardHeader>
        <CardContent className="space-y-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-5 bg-grey-50 rounded-lg"
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Rate</FormLabel>
                      <FormControl>
                        <Rate readonly={false} {...field} initialRating={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Add detailed review</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-white resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {isLoading ? (
                <LoadingButton className="w-full p-4" />
              ) : (
                <Button type="submit" className="bg-red-500 w-full p-4">
                  Rate
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatingForm;
