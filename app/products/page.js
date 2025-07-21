import React from "react";
import PageLocation from "./_components/PageLocation";
import CategoryBy from "./_components/CategoryBy";
import AllProductsShow from "./_components/AllProductsShow";
import { getAllProducts } from "@/query/product";
import { getAllCategory } from "@/query/category";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { sanitizeData } from "@/lib/sanitizeData";

const page = async () => {
  const products = sanitizeData(await getAllProducts());
  const categories = await getAllCategory();

  const loggedInUser = sanitizeData(await getLoggedInUser());

  return (
    <div className="pt-35">
      <PageLocation />
      <CategoryBy categories={categories} />
      <AllProductsShow products={products} loggedInUser={loggedInUser} />
    </div>
  );
};

export default page;
