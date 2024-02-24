import LoadingButton from "@/components/LoadingButton";
import OtpVerification from "@/components/OtpVerification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  otp: z.string().min(1, "Otp is required"),
});

type OtpFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (otp: OtpFormData) => void;
  isLoading: Boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const OtpForm = ({ onSave, onClose, isLoading, onSuccess }: Props) => {
  const form = useForm<OtpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [otpVerificationSuccess, setOtpVerificationSuccess] = useState(false);

  const handleFormSubmit = async (data: OtpFormData) => {
    onSave(data);
    setOtpVerificationSuccess(true);
  };

  useEffect(() => {
    if (otpVerificationSuccess) {
      onSuccess();
    }
  }, [otpVerificationSuccess, onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <Card className="w-[400px]">
        <CardHeader className="relative">
          <OtpVerification />
          <CardTitle className="text-lg">Verify Account</CardTitle>
          <CardDescription className="text-base">
            Enter the otp you recieved on the registered email
          </CardDescription>
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
                name="otp"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Otp</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
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
                  Verify
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpForm;
