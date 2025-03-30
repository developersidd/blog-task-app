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
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { apiClient } from "@/services/axios";
const MAX_FILE_SIZE = 5000000; // 5MB
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file?.name?.split(".")?.pop();
    //console.log("fileType:", fileType);
    const allowedTypes = ["png", "jpg", "jpeg"];
    if (allowedTypes.includes(fileType as string)) return true;
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
  avatar: z
    .any()
    .refine((file) => file, "File is required")
    .refine((file) => file?.size < MAX_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkFileType(file),
      "Only .png, .jpg, .jpeg formats are supported."
    ),
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
      avatar: undefined,
    },
  });
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (values: FormData) => {
      // 1. Upload avatar to Cloudinary
      const formData = new FormData();
      formData.append("avatar", values.avatar);

      const uploadResponse = await apiClient.post(
        "/users/upload/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(" uploadResponse:", uploadResponse);
      const { secure_url, public_id } = uploadResponse.data?.data || {};
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.full_name,
            username: values.username,
            avatar: secure_url,
            avatar_public_id: public_id,
          },
        },
      });
      console.log(" data:", data);

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
            <FormField
              className="grid gap-2"
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Avatar </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
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
