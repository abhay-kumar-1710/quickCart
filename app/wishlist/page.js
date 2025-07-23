import React, { Suspense } from "react";
import Link from "next/link";
import WishlistCard from "./_components/WishlistCard";
import { getUserProductInWishlist } from "@/query/wishlist";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { redirect } from "next/navigation";
import { sanitizeData } from "@/lib/sanitizeData";
import Image from "next/image";
import Loader from "@/components/Loader";

const page = async () => {
  const loggedInUser = sanitizeData(await getLoggedInUser());

  const wishlistItems = sanitizeData(
    await getUserProductInWishlist(loggedInUser?._id)
  );

  if (!loggedInUser) {
    redirect("/login");
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="flex justify-center items-center w-[90%] mx-auto pt-34 pb-5 gap-5  flex-col  ">
          <h1 className="text-4xl md:text-6xl font-medium">My Wish List</h1>
          {wishlistItems.length > 0 ? (
            <div className="w-[100%] flex justify-start items-center gap-15 flex-col  xl:flex-row xl:flex-wrap">
              <WishlistCard
                wishlistItems={wishlistItems}
                loggedInUser={loggedInUser}
              />
            </div>
          ) : (
            <>
              <div className="w-full min-h-[50vh] flex justify-center items-center flex-col gap-5 my-5">
                <h1 className="text-2xl md:text-4xl text-black text-center font-semibold">
                  No Products to Show
                </h1>
                <div className="w-[80%]  flex justify-center items-center">
                  <Image
                    width={500}
                    height={500}
                    src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
                    alt="Empty Cart"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Suspense>
    </>
  );
};

export default page;

export const metadata = {
  title: `Quick Cart - Wishlist Products`,
};
