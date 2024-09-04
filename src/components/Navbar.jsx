"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import useHydratedUserStore from "@/hooks/useUserStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2, Search, X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import useHydratedCartStore from "@/hooks/useCartStore";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Input as SearchInput } from "./ui/input";

export default function Navbar() {
  const { isAuthenticated, signOut } = useHydratedUserStore();
  const router = useRouter();
  const { toast } = useToast();
  const { cartItems, removeItemFromCart } = useHydratedCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    let total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setCartTotal(total.toFixed(2));
  }, [cartItems]);

  const handleSignOut = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.get("/api/sign-out");

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      setIsSubmitting(false);
      signOut();
      toast({
        title: "Successfully signed out",
      });
      router.replace("/sign-in");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    router.push(`/search-results?query=${encodeURIComponent(searchQuery)}`) 
  }

  return (
    <div className="bg-background z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 justify-between items-center">
              <Link href={"/"} className="text-xl sm:text-4xl font-bold text-blue-400">
                ShopperStop
              </Link>

              <form onSubmit={handleSearch} className="flex gap-2">
                <SearchInput onChange={(e) => setSearchQuery(e.target.value)}/>
                <Button type="submit" disabled={searchQuery.trim().length === 0}>
                  <Search />
                </Button>
              </form>


              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Button
                    variant="destructive"
                    disabled={isSubmitting}
                    onClick={handleSignOut}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-4 animate-spin" />
                        Signing Out...
                      </>
                    ) : (
                      "Sign Out"
                    )}
                  </Button>
                  <Sheet>
                    <SheetTrigger>
                      <ShoppingCart />
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>
                          <div className="flex mt-4 justify-between pr-4 text-sm sm:text-xl">
                            <div>Your Cart{` ( ${cartItems.length} )`}</div>
                            <div>Total : {`$ ${cartTotal}`}</div>
                          </div>
                        </SheetTitle>
                      </SheetHeader>
                      <Separator className="mt-4"/>
                      <ScrollArea className="h-full pr-6">
                        {cartItems.length === 0 ? (
                          <div className="flex flex-col justify-center items-center h-3/4">
                            <div className="flex flex-col gap-4 items-center">
                              <Image
                                src="/empty-cart.png"
                                width={200}
                                height={200}
                                alt="empty cart"
                              />
                              <h1 className="text-3xl font-bold text-muted-foreground">
                                Your Cart is Empty
                              </h1>
                            </div>
                          </div>
                        ) : (
                          cartItems.map((item, index) => (
                            <div key={item.id} className="w-full">
                              <div
                                className="flex items-center justify-between mt-6"
                              >
                                <div className="flex items-center w-3/4">
                                  <Image
                                    src={item.thumbnail}
                                    height={100}
                                    width={100}
                                    alt="product image"
                                  />
                                  <div className="flex flex-col gap-2 sm:gap-4">
                                    <h2 className="font-bold text-xs sm:text-sm text-wrap">
                                      {item.title}
                                    </h2>
                                    <X
                                      onClick={() => removeItemFromCart(item)}
                                      className="tet-red-500 h-4 w-4 cursor-pointer hover:scale-150 hover:text-red-600 transition-all"
                                    />
                                  </div>
                                </div>
                                <h2 className="text-xs sm:text-sm font-bold">{`$ ${item.price}`}</h2>
                              </div>
                              {index < cartItems.length - 1 && (
                                <Separator className="mt-4" />
                              )}
                            </div>
                          ))
                        )}
                        <Separator className="mt-4"/>
                        <SheetFooter>
                          <div className="flex mt-8 mb-10 font-bold text-xl justify-between w-full">
                            <h2>Total</h2>
                            <h2>{`$ ${cartTotal}`}</h2>
                          </div>
                        </SheetFooter>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                </div>
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
