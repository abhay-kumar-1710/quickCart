import React from "react";
import Link from "next/link";
import AddtoCartCard from "./_components/AddtoCartCard";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { getUserCartProducts } from "@/query/addtocart";
import { redirect } from "next/navigation";
import { sanitizeData } from "@/lib/sanitizeData";
import formatPrice from "@/lib/formatPrice";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import AddtoCartBuyNow from "./_components/AddtoCartBuyNow";

const page = async () => {
  const loggedInUser = await getLoggedInUser();

  const userCartItems = sanitizeData(
    await getUserCartProducts(loggedInUser?._id)
  );

  if (!loggedInUser) {
    redirect("/login");
  }

  let itemsPrice = 0;

  const itemsPriceMap = userCartItems.map(
    (cartItem) =>
      (itemsPrice += cartItem?.productId?.price * cartItem?.quantity)
  );

  const totalPrice = itemsPrice + 100

  const orderTotalPrice = totalPrice - 70

  // console.log(itemsPrice);
  // console.log(userCartItems);

  
  return (
    <>
      <h1 className="text-6xl font-medium pt-35 text-center">My Cart</h1>
      {userCartItems?.length > 0 ? (
        <div className="flex justify-center w-[90%] mx-auto py-10 gap-5  flex-col items-center lg:flex-row-reverse lg:items-start ">
          <div className="w-[100%] p-5 py-8 flex justify-start items-center flex-col gap-5  rounded-2xl shadow-lg shadow-zinc-800  lg:w-[75%] xl:w-[45%]">
            <h2 className="text-3xl font-medium">Order&apos;s Summary</h2>
            <div className="w-[80%] flex justify-between items-center px-8">
              <h4 className="text-xl font-medium">Items Price :</h4>
              <span className="text-xl font-medium">
                {formatPrice(itemsPrice)}
              </span>
            </div>
            <div className="w-[80%] flex justify-between items-center px-8">
              <h4 className="text-xl font-medium">Delivery Charges :</h4>
              <span className="text-xl font-medium">₹100</span>
            </div>
            <div className="w-[80%] flex justify-between items-center px-8">
              <h4 className="text-xl font-medium">Total :</h4>
              <span className="text-xl font-medium">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="w-[80%] flex justify-between items-center px-8">
              <h4 className="text-xl font-medium">Discount Applied :</h4>
              <span className="text-xl font-medium">₹70</span>
            </div>
            <div className="w-[80%] h-[1px] bg-zinc-500 opacity-50"></div>
            <div className="w-[80%] flex justify-between items-center px-8">
              <h4 className="text-2xl font-medium">Order Total :</h4>
              <span className="text-2xl font-medium">
                {formatPrice(orderTotalPrice)}
              </span>
            </div>
            <AddtoCartBuyNow
              userCartItems={userCartItems}
              orderTotalPrice={orderTotalPrice}
            />
          </div>
          <div className="w-[100%] flex justify-start items-center gap-10 flex-col lg:w-[65%] xl:flex-row xl:flex-wrap">
            <AddtoCartCard userCartItems={userCartItems} />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-80vh flex justify-center items-center flex-col gap-5">
            <h1 className="text-5xl text-black text-center font-semibold">
              No Products to Show
            </h1>
            <Image
            width={500}
            heigth={500}
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
              alt="Empty Cart"
            />
          </div>
        </>
      )}
    </>
  );
};

export default page;
