"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { createCheckOutSession } from "@/app/actions/stripe";

const AddtoCartBuyNow = ({ orderTotalPrice, userCartItems }) => {
  const handleBuyNowAction = async (data) => {
    const { url } = await createCheckOutSession(data);
    window.location.assign(url);
  };

  
  return (
    <div className="w-full flex justify-center items-center">
      <form action={handleBuyNowAction} className="w-[80%]">
        <input type="hidden" name="orderTotalPrice" value={orderTotalPrice} />
        <input type="hidden" name="productId" value={userCartItems[0]?.productId?._id} />
        <Button
          className={
            "w-full hover:cursor-pointer bg-green-700 hover:bg-green-900"
          }
        >
          Buy Now
        </Button>
      </form>
    </div>
  );
};

export default AddtoCartBuyNow;
