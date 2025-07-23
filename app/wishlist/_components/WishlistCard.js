"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { wishlistDeleteAction } from "@/app/actions/wishlist";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/app/actions/addtocart";
import formatPrice from "@/lib/formatPrice";

const WishlistCard = ({ wishlistItems, loggedInUser }) => {
  const router = useRouter();

  const handleWishlistDelete = async (e, userId, productId, productName) => {
    e.preventDefault();
    try {
      const res = await wishlistDeleteAction(userId, productId);
      toast.success(`${productName} has been removed from wishlist!`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to remove item from wishlist!`);
    }
  };

    const handleSubmit = async (e, productId, productName, value) => {
      e.preventDefault();
  
      if (value === "") {
        toast.warning("You have to Select Quantity!");
      } else {
        try {
          const res = await addToCartAction(productId, loggedInUser?._id, value);
          toast.success(`${productName} added To Cart`);
          router.refresh();
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      }
    };

  return (
    <>
      {wishlistItems.map((wishList) => (
        <div
          key={wishList?._id}
          className="w-[100%] xl:w-[25%] lg:w-[40%] sm:w-[100%] md:w-[100%]  border-zinc-200 bg-zinc-300 border-2  rounded-3xl flex justify-start items-center flex-col p-3 gap-2 relative sm:p-5"
        >
          <Link
            href={`/products/${wishList?.productId?._id}`}
            className="w-full flex justify-start items-center flex-col gap-2"
          >
            <div className="w-full h-60 sm:h-80">
              <Image
                src={wishList?.productId?.productImage}
                alt={wishList?.productId?.productName}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <h3 className="px-3 text-2xl font-semibold">
                {wishList?.productId?.productName?.length > 15
                  ? wishList?.productId?.productName.slice(0, 15) + "..."
                  : wishList?.productId?.productName}
              </h3>
              <div className="  bg-zinc-100 px-1 rounded-full">
                <span className="text-[12px]">
                  {wishList?.productId?.categoryId?.categoryName}
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <Star color="yellow" />

                <span>{wishList?.productId?.testimonials?.length} reviews</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-xl font-semibold">
                  {formatPrice(wishList?.productId?.price)}
                </span>
              </div>
            </div>
          </Link>

          <div className="w-full flex flex-col justify-between items-center gap-2 md:flex-row">
            <form
              onSubmit={(e) => {
                handleSubmit(
                  e,
                  wishList?.productId?._id,
                  wishList?.productId?.productName,
                  1
                );
              }}
              className="w-full md:w-1/2"
            >
              <Button
                variant={"outline"}
                className={"w-full hover:cursor-pointer"}
              >
                Add to Cart
              </Button>
            </form>
            <form
              onSubmit={(e) => {
                handleWishlistDelete(
                  e,
                  wishList?.userId,
                  wishList?.productId,
                  wishList?.productId?.productName
                );
              }}
              className="w-full md:w-1/2"
            >
              <Button
                variant={"destructive"}
                className={"w-full hover:cursor-pointer"}
              >
                Remove from Wishlist
              </Button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default WishlistCard;
