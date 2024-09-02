"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");

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
      <div className="w-full flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-between">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}/`}
            key={product.id}
            className="mt-20 w-400 h-400 cursor-pointer border p-4 rounded-lg shadow-md"
          >
            <Image
              src={product.thumbnail}
              width={300}
              height={300}
              alt="product-img"
              priority={true}
            />
            <h2 className="mt-2 text-center text-xl">{product.title}</h2>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
