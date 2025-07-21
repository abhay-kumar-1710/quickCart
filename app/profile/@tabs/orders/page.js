import React from 'react'
import OrderCard from './_components/OrderCard';
import { getLoggedInUser } from '@/lib/getLoggedinUser';
import { redirect } from 'next/navigation';
import { getUserOrders } from '@/query/order';

const page = async() => {

  const loggedInUser = await getLoggedInUser()
  
  if(!loggedInUser) {
    redirect('/login')
  }

  const userAllOrders = await getUserOrders(loggedInUser?._id)

  

  return (
    <div className="w-full flex justify-start items-center flex-wrap gap-14 xl:gap-24 p-5  ">
      {userAllOrders.length > 0 ? (
        <OrderCard userAllOrders={userAllOrders} />
      ) : (
        <div className="w-full h-80vh flex justify-center items-center flex-col gap-5">
          <h1 className="text-5xl text-black text-center font-semibold">
            No Products to Show
          </h1>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default page