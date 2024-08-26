"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/validators/signUp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post("/api/sign-up", data);

      if (response.status !== 200) {
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Successfully signed up!",
        description: "You can now sign in with your credentials",
      });

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in signing up ", error);
      setIsSubmitting(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <h1 className="text-5xl font-bold text-blue-400 text-center mt-20">Sign Up</h1>
      <div className="mt-10 border p-4 rounded-lg mx-auto max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='mt-4 self-center min-w-24' type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-2 text-center">Already have an account?
          <Link className="ml-2 text-blue-600 hover:underline" href={'/sign-in'}>Sign In</Link>
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default SignUp;
