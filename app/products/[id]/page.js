import React from "react";
import PageLocation from "./_components/PageLocation";
import ProductDetailsAndImage from "./_components/ProductDetailsAndImage";
import Testimonials from "./_components/Testimonials";
import YouMightAlsoLike from "./_components/YouMightAlsoLike";
import {
  getAllProducts,
  getProductsByCategoryId,
  getProductsById,
} from "@/query/product";
import { sanitizeData } from "@/lib/sanitizeData";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { findProductInCart } from "@/query/addtocart";
import { findProductInWishlist } from "@/query/wishlist";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const page = async ({ params: { id } }) => {
  const productdetails = sanitizeData(await getProductsById(id));

  const testimonials = sanitizeData(productdetails?.testimonials);
  const loggedInUser = sanitizeData(await getLoggedInUser());

  const reletedProducts = sanitizeData(
    await getProductsByCategoryId(productdetails?.categoryId?._id)
  );

  const randomRelatedProducts = reletedProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const getProductInCart = sanitizeData(
    await findProductInCart(productdetails?._id, loggedInUser?._id)
  );

  const isItemInWishlist = sanitizeData(
    await findProductInWishlist(loggedInUser?._id, productdetails?._id)
  );

  // console.log("loggedInUser", loggedInUser);

  return (
    <Suspense fallback={<Loader/>}>
      <div className="pt-30">
        <PageLocation productdetails={productdetails} />
        <ProductDetailsAndImage
          productdetails={productdetails}
          loggedInUser={loggedInUser}
          getProductInCart={getProductInCart}
          isItemInWishlist={isItemInWishlist}
        />
        <Testimonials
          testimonials={testimonials}
          productdetails={productdetails}
          loggedInUser={loggedInUser}
        />
        <YouMightAlsoLike
          randomRelatedProducts={randomRelatedProducts}
          loggedInUser={loggedInUser}
        />
      </div>
    </Suspense>
  );
};

export default page;

export const metadata = {
  title: `Quick Cart - Product Detail Page`,
};
