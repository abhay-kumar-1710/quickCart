"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import formatPrice from "@/lib/formatPrice";

const YouMightAlsoLikeCard = ({ randomRelatedProducts }) => {
 
  return (
    <div className="w-full flex justify-between items-center flex-wrap gap-10  p-5 ">
      {randomRelatedProducts.map((product) => (
        <div
          key={product?._id}
          className="w-[100%] xl:w-[23%] lg:w-[40%] sm:w-[100%] md:w-[45%]  border-zinc-200 bg-zinc-300 border-2  rounded-3xl flex justify-start items-center flex-col p-3 gap-2 relative sm:p-5"
        >
          <Link
            href={`/products/${product?._id}`}
            className="w-full justify-start items-center flex-col gap-2"
          >
            <div className="w-full h-60 sm:h-80">
              <Image
                src={product?.productImage}
                alt={product?.productName}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <h3 className="px-3 text-2xl font-semibold">
                {product?.productName?.length > 15
                  ? product?.productName.slice(0, 15) + "..."
                  : product?.productName}
              </h3>
              <div className="bg-zinc-100 px-1 rounded-full">
                <span className="text-[12px]">
                  {product?.categoryId?.categoryName}
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <Star color="yellow" />

                <span>{product?.testimonials?.length} reviews</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-xl font-semibold">
                  {formatPrice(product?.price)}
                </span>
              </div>
            </div>
          </Link>

        
        </div>
      ))}
    </div>
  );
};

export default YouMightAlsoLikeCard;
