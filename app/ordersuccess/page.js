import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getProductsById } from "@/query/product";
import { getUserByEmail } from "@/query/user";

import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { addOrder, buyNowTypeAddToCart } from "@/query/order";
import Image from "next/image";
import OrderSuccessButton from "./_components/OrderSuccessButton";

const Success = async ({
  searchParams: { session_id, productId, buyNowTypeSingle },
}) => {
  if (!session_id) {
    throw new Error("Session Id is not there.");
  }

  const userSession = await getServerSession(authOptions);

  // console.log(userSession);

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const product = await getProductsById(productId);

  const loggedInUser = await getUserByEmail(userSession?.user?.email);
  // console.log(loggedInUser);

  const checkOutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

  const customerEmail = loggedInUser?.email;

  const productName = product?.productName;

  const paymentIntent = checkOutSession?.payment_intent;
  const paymentStatus = paymentIntent?.status;

  // console.log("buyNowTypeSingle", buyNowTypeSingle);

  if (paymentStatus === "succeeded") {
    if (buyNowTypeSingle == "true") {
      const orders = await addOrder(loggedInUser?._id, productId);
      // console.log("orders");
    } else {
      const buyNowTypeAddToCartVariable = await buyNowTypeAddToCart(
        loggedInUser?._id
      );
      // console.log("buyNowTypeAddToCartVariable");
    }
  }

  return (
    <div className="h-screen w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            <Image
              src={
                "https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif"
              }
              width={500}
              height={500}
              alt="Tick Mark"
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations! <strong>{customerName}</strong> Your Order was
              Successful for <strong>{productName}</strong>
            </h1>
          </>
        )}

        <div className="flex items-center gap-3">
          <OrderSuccessButton />
        </div>
      </div>
    </div>
  );
};
export default Success;
