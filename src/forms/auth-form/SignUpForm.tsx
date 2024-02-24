// SignUpForm.jsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/LoadingButton";
import Logo from "@/components/Logo";
import { PasswordInput } from "@/components/PasswordInput";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type SignUpFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (signUpData: SignUpFormData) => void;
  onClose: () => void;
  onSuccess: () => void;
  isLoading: Boolean;
};

const SignUpForm = ({ onSave, onClose, isLoading, onSuccess }: Props) => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleFormSubmit = async (data: SignUpFormData) => {
    onSave(data);
    setSignUpSuccess(true);
  };

  useEffect(() => {
    if (signUpSuccess) {
      onSuccess();
    }
  }, [signUpSuccess, onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <Card className="w-[400px] max-h-full h-auto overflow-y-auto scrollbar-none">
        <CardHeader className="relative">
          <Logo />
          <CardTitle className="text-lg">Create an account</CardTitle>
          <CardDescription className="text-sm">
            Enter your credentials below to create your account
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
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          className="bg-white"
                          autoComplete="password"
                        />
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
                  Sign Up
                </Button>
              )}
            </form>
          </Form>
          {/* <GoogleButton /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
