import HeroSection from "@/components/HeroSection";
import HighlyRecommended from "@/components/HighlyRecommended";
import HomeBanner from "@/components/HomeBanner";
import HomeCategory from "@/components/HomeCategory";
import HomeFeaturesProduct from "@/components/HomeFeaturesProduct";
import HomeMobile from "@/components/HomeMobile";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { sanitizeData } from "@/lib/sanitizeData";
import { getAllCategory } from "@/query/category";
import { getAllProducts, getProductsByCategoryId } from "@/query/product";
import Image from "next/image";
import { addToCartDeleteQuery, getUserCartProducts } from "@/query/addtocart";

export default async function Home() {
  const products = sanitizeData(await getAllProducts());

  const featureProducts = products.sort(() => 0.5 - Math.random()).slice(0, 8);

  const mobileCatId = "6877319c898df4bbe7af2778";

  const mobileProducts = sanitizeData(await getProductsByCategoryId(mobileCatId))

  const mobile4Products = mobileProducts.sort(()=> 0.5 - Math.random()).slice(0,4)

  const highlyRecommendedProducts = products.sort(()=> 0.5 - Math.random()).slice(0,8)

  const allCategory = await getAllCategory()
  const homeCategoryCards = allCategory.sort(()=> 0.5 - Math.random()).slice(0,5)
 
  const loggedInUser = sanitizeData(await getLoggedInUser());
  const allUserProductsInCart = sanitizeData(
    await getUserCartProducts(loggedInUser?._id)
  );
 
  

  return (
    <>
      <HeroSection />
      <HomeCategory homeCategoryCards={homeCategoryCards} />
      <HomeFeaturesProduct
        featureProducts={featureProducts}
        loggedInUser={loggedInUser}
        allUserProductsInCart={allUserProductsInCart}
      />
      <HomeMobile
        mobile4Products={mobile4Products}
        loggedInUser={loggedInUser}
      />
      <HighlyRecommended
        highlyRecommendedProducts={highlyRecommendedProducts}
        loggedInUser={loggedInUser}
      />
      <HomeBanner />
    </>
  );
}
