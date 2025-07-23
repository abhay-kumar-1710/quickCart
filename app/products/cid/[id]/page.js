import { getProductsByCategoryId } from "@/query/product";
import React from "react";
import PageLocation from "./_components/PageLoaction";
import CategoryBy from "./_components/CategoryBy";
import { getAllCategory, getCategoryById } from "@/query/category";
import ProductsByCategory from "./_components/ProductsByCategory";
import { sanitizeData } from "@/lib/sanitizeData";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const page = async ({ params: { id } }) => {
  const products = sanitizeData(await getProductsByCategoryId(id));
  const categories = sanitizeData(await getAllCategory());


  const category = sanitizeData(await getCategoryById(id));

  const loggedInUser = sanitizeData(await getLoggedInUser())
  
  

  return (
    <Suspense fallback={<Loader/>}>
      <div className="pt-35">
        <PageLocation />
        <CategoryBy categories={categories} />
        <ProductsByCategory
          products={products}
          category={category}
          loggedInUser={loggedInUser}
        />
      </div>
    </Suspense>
  );
};

export default page;

export const metadata = {
  title: `Quick Cart - Products By Category`,
};