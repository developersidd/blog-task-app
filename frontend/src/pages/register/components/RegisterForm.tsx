"use client";

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
import supabase from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
function checkFileType(file) {
  //console.log("file:", file);
  if (file?.name) {
    const fileType = file?.name?.split(".")?.pop();
    //console.log("fileType:", fileType);
    const allowedTypes = ["png", "jpg", "jpeg"];
    if (allowedTypes.includes(fileType)) return true;
  }
  return false;
}

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  full_name: z.string().min(3, {
    message: "Full name must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

type FormData = z.infer<typeof formSchema>;

function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      full_name: "",
    },
  });
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (values: FormData) => {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.full_name,
            username: values.username,
          },
        },
      });
      console.log(" data:", data)

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("User registered successfully!");
      navigate("/login");
    },
    onError: (error: any) => {
      console.log("error:", error);
      toast.error(error?.message || "There was an error occurred!");
    },
  });

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl ">Register</CardTitle>
        <CardDescription>
          Enter your email below to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(registerUser)}
          >
            <FormField
              className="grid gap-2"
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username </FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="grid gap-2"
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FullName </FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="grid gap-2"
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              className="grid gap-2"
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password </FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              Register
            </Button>
            {/*</div>*/}
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <p>
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
export default RegisterForm;
