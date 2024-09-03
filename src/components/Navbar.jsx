"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import useHydratedUserStore from "@/hooks/useUserStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, signOut } = useHydratedUserStore();
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSignOut = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.get('/api/sign-out');

      if(response.status !== 200){
        throw new Error('Something went wrong');
      }

      setIsSubmitting(false);
      signOut();
      toast({
        title: "Successfully signed out"
      })
      router.replace('/sign-in');
      
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 justify-between items-center">
              <Link href={"/"} className="text-4xl font-bold text-blue-400">
                ShopperStop
              </Link>

              {isAuthenticated ? (
                <Button disabled={isSubmitting} onClick={handleSignOut}>{isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-4 animate-spin"/>
                    Signing Out...
                  </>
                ) : "Sign Out"}</Button>
              ) : (
                <Link href={"/sign-in"}>
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
