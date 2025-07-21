import { getLoggedInUser } from "@/lib/getLoggedinUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";


const layout =  async({ tabs }) => {
  const profileBgColor = [
    "bg-red-600",
    "bg-blue-600",
    "bg-yellow-600",
    "bg-green-600",
    "bg-violet-600",
    "bg-amber-600",
    "bg-cyan-600",
    "bg-teal-600",
    "bg-fuchsia-600",
    "bg-indigo-600",
  ];
  const randomNumber = Math.random() * 10;
  const floorNumber = Math.floor(randomNumber);
  const randomColor = profileBgColor[floorNumber];
  
  const loggedInUser = await getLoggedInUser()

  if(!loggedInUser){
    redirect('/login')
  }
  
  

  return (
    <>
      <div className="flex justify-center w-[90%] mx-auto pt-34 pb-5 gap-5  flex-col items-center lg:flex-row lg:items-start ">
        <div className="w-[100%] p-5  h-140 flex justify-start items-center flex-col gap-5  rounded-2xl shadow-lg shadow-zinc-800 pt-14 lg:w-[75%] xl:w-[25%]">
          <div
            className={`w-34 h-34 rounded-full ${randomColor} flex justify-center items-center`}
          >
            <span className="text-8xl font-medium">
              {loggedInUser?.firstName[0]}
            </span>
          </div>
          <div className="flex justify-center items-center w-full flex-col">
            <h4 className="text-xl font-medium">{`${loggedInUser?.firstName} ${loggedInUser?.lastName} `}</h4>
            <span className="text-md text-zinc-600">{loggedInUser?.email}</span>
          </div>
          <div className="w-[80%] flex justify-center items-start flex-col gap-3 py-8">
            <Link href="/profile" className="hover:cursor-pointer">
              <span className="text-lg font-medium">Profile</span>
            </Link>
            <Link href="/profile/orders" className="hover:cursor-pointer">
              <span className="text-lg font-medium">My orders</span>
            </Link>
            <Link href="/wishlist" className="hover:cursor-pointer">
              <span className="text-lg font-medium">Wishlist</span>
            </Link>
            <Link href="/addtocart" className="hover:cursor-pointer">
              <span className="text-lg font-medium">My Cart</span>
            </Link>
          </div>
        </div>
        <div className="w-[100%] xl:w-[65%]">{tabs}</div>
      </div>
    </>
  );
};

export default layout;
