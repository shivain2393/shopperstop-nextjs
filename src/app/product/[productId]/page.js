"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = ({ params }) => {

    const [product, setProduct] = useState({})

    useEffect(() => {

        const getProduct = async () => {

            try {
                
                const response = await axios.get(`https://dummyjson.com/products/${params.productId}`)

                setProduct(response.data);

            } catch (error) {
                console.error(error);
            }
        }

        getProduct();

    }, [])
    
    return(
        <MaxWidthWrapper>
            <div className="grid grid-cols-3 mt-20">
                <div className="w-full">
                    <img src={product.thumbnail} alt="product-img" />
                </div>
                <div className="col-span-2 p-4 flex flex-col gap-3">
                    <h1 className="text-4xl font-bold">{product.title}</h1>
                    <p className="text-xl">{product.description}</p>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default ProductPage;