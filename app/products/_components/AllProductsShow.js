"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { addToCartAction } from "@/app/actions/addtocart";
import { toast } from "sonner";
import { createCheckOutSession } from "@/app/actions/stripe";
import formatPrice from "@/lib/formatPrice";

const AllProductsShow = ({ products, loggedInUser }) => {
  const router = useRouter();
 

  const handleSubmit = async (e, productId, productName, value) => {
    e.preventDefault();
    if (!loggedInUser) {
      return redirect("/login");
    }
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

  const handleBuyNowAction = async (data) => {
    const { url } = await createCheckOutSession(data);
    window.location.assign(url);
  };

  

  return (
    <div className="w-[90%] mx-auto py-4 flex justify-start items-start flex-col md:px-8">
      <h1 className="text-3xl">All Products Of QuickCart</h1>
      <div className="w-full flex justify-start items-center flex-wrap gap-10  p-5">
        {products.map((product) => (
          <div
            key={product?._id}
            className="w-[100%] xl:w-[23%] lg:w-[40%] sm:w-[100%] md:w-[45%]  border-zinc-200 bg-zinc-300 border-2  rounded-3xl flex justify-start items-center flex-col p-3 gap-2 relative sm:p-5"
          >
            <Link
              className="w-full  flex justify-start items-center flex-col gap-2"
              href={`/products/${product?._id}`}
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

            <div className="w-full flex justify-between items-center gap-2">
              <form
                onSubmit={(e) => {
                  handleSubmit(e, product?._id, product?.productName, 1);
                }}
                className="w-1/2"
              >
                <Button
                  variant={"outline"}
                  className={"w-full hover:cursor-pointer"}
                >
                  Add to Cart
                </Button>
              </form>
              <form action={handleBuyNowAction} className="w-1/2">
                <input type="hidden" name="productId" value={product?._id} />
                <Button className={"w-full hover:cursor-pointer"}>
                  Buy Now
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsShow;
