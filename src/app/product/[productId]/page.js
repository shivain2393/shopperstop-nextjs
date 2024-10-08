"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useHydratedCartStore from "@/hooks/useCartStore";
import useHydratedUserStore from "@/hooks/useUserStore";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";


const ProductPage = ({ params }) => {
  const [product, setProduct] = useState({});
  const { toast } = useToast();
  const { addItemToCart, removeItemFromCart, cartItems } = useHydratedCartStore();
  const [isInCart, setIsInCart] = useState(false);
  const { isAuthenticated } = useHydratedUserStore();
  const router = useRouter();
  

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${params.productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();

  }, [params.productId]);


  useEffect(() => {
    if (product && product.id) {
      const isPresent = cartItems.some(item => item.id === product.id);
      setIsInCart(isPresent);
    }

  }, [product, cartItems]);

  const addToCart = () => {
    if(isAuthenticated){
      addItemToCart(product);

    toast({
      title: "Added to Cart",
      description: `You have added ${product.title} to your cart`,
    });
    }
    else{
      toast({
        title: "Login to add to cart",
        description: `You need to login first`,
        variant: "destructive",
      })
      router.push("/sign-in");
    }
  };

  const removeFromCart = () => {
    removeItemFromCart(product);

    toast({
      title: "Removed from Cart",
      description: `You have removed ${product.title} from your cart`,
      variant: "destructive"
    });

  }

  return (
    <MaxWidthWrapper>
      {product.thumbnail ? (
        <>
        <div className="flex flex-col justify-center gap-4 sm:grid sm:grid-cols-3 sm:mt-20">
          <div className="w-full border-b sm:border-r sm:border-b-0">
            <Image
              src={product.thumbnail}
              alt={product.title || "Product Image"}
              width={400}
              height={400}
              />
          </div>
          <div className="col-span-2 p-4 flex flex-col gap-6">
            <h1 className="text-5xl sm:text-4xl font-bold">{product.title}</h1>
            <p className="text-2xl sm:text-xl">{product.description}</p>
            <h2 className="text-2xl font-bold">{`$ ${product.price}`}</h2>
            {isInCart ? (
              <Button onClick={removeFromCart} variant="destructive" className="w-full sm:w-1/2">Remove From Cart</Button>
            ) : (
              <Button onClick={addToCart} className="w-full sm:w-1/2">
                Add to Cart
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col mt-6">
          <h1 className="text-3xl font-bold self-center">Customer Reviews</h1>
          <div className="flex flex-col gap-4">
            {product.reviews.map((review, index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>
                    {review.comment}
                  </AccordionTrigger>
                  <AccordionContent>
                    <h2>Rating: <span className="font-bold">{review.rating}</span></h2>
                    <h2>Review By : <span className="font-bold">{review.reviewerName}</span></h2>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
            </>
      ) : (
        <div className="mt-20 flex justify-center items-center w-full">
          <Loader2 className="size-16 animate-spin" />
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default ProductPage;
