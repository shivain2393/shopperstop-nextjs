"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=0&sortBy=category&order=desc");

        const data = response.data.products;
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="w-full flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:justify-between">
        {products ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))
        ) : (
          <div className="mt-20 flex justify-center items-center w-full">
            <Loader2 className="size-16 animate-spin" />
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
