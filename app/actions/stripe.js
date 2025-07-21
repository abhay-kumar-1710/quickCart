"use server";
import { headers } from "next/headers";
import { formatAmountForStripe } from "@/lib/stripeHelpers";
import { stripe } from "@/lib/stripe";
import { getProductsById } from "@/query/product";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { redirect } from "next/navigation";
const CURRENCY = "INR";

export async function createCheckOutSession(data) {
  const ui_mode = "hosted";
  const origin = (await headers()).get("origin");

  const loggedInUser = await getLoggedInUser()
  if(!loggedInUser) {
    redirect('/login')
  }

  const productId = data.get("productId");
  const orderTotalPrice = data.get("orderTotalPrice");

  let buyNowTypeSingle = true

  if(orderTotalPrice) {
    buyNowTypeSingle = false
  }
  
  

  const product = await getProductsById(productId);

  // if (!product) return new Error("Product not Found");

  const productName = orderTotalPrice ? "QuickCart" : product?.productName;
  const productPrice = orderTotalPrice ? orderTotalPrice : product?.price;

  const checkOutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: productName,
          },
          unit_amount: formatAmountForStripe(productPrice, CURRENCY),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/ordersuccess?session_id={CHECKOUT_SESSION_ID}&productId=${productId}&buyNowTypeSingle=${buyNowTypeSingle}`,
      cancel_url: `${origin}/products/${productId}`,
    }),
    ui_mode,
  });
  return {
    client_secret: checkOutSession.client_secret,
    url: checkOutSession.url,
  };
}


export async function createPaymentIntent(data) {
    const paymentIntent = await stripe.paymentIntents.create({
        amount : formatAmountForStripe(productPrice, CURRENCY),
        automatic_payment_methods : {enabled : true}
    })
    return {client_secret : paymentIntent.client_secret}
}