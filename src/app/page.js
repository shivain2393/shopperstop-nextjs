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

        const response = await axios.get("https://dummyjson.com/products")

        const data = response.data.products;
        setProducts(data);
        
      } catch (error) {
        console.error(error);
      }
    }

    getProducts();

  } , [])

  return(
    <MaxWidthWrapper>
      <div className="w-full flex flex-wrap justify-between">
        {products.map((product) => (
          <Link href={`/product/${product.id}/`} key={product.id} className="mt-20 w-400 h-400 cursor-pointer">
            <img src={product.thumbnail} alt="product-img" />
            {/* <Image src={product.thumbnail}  width={400} height={400}/> */}
            <h2 className="mt-2 text-center text-xl">{product.title}</h2>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default Home;