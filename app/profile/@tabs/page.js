import React from "react";
import PersonalDetails from "./_components/PersonalDetails";

import Password from "./_components/Password";
import { getLoggedInUser } from "@/lib/getLoggedinUser";
import { sanitizeData } from "@/lib/sanitizeData";
import Address from "./_components/Address";
import { getAddressByUserId } from "@/query/address";



const page = async () => {

  const rawloggedInUser = await getLoggedInUser()
  const loggedInUser = sanitizeData(rawloggedInUser)

  const rawUserAddress = await getAddressByUserId(loggedInUser?._id);
  const userAddress = sanitizeData(rawUserAddress)
  

  
  return (
    <>
      <div className="flex justify-center items-center w-full flex-col gap-5">
        <PersonalDetails loggedInUser={loggedInUser} />
        <div className="flex justify-between items-start gap-5 w-full flex-col xl:flex-row">
          <div className="w-full">
            <Address loggedInUser={loggedInUser} userAddress={userAddress} />
          </div>
          <div className="w-full">
            <Password loggedInUser={loggedInUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

export const metadata = {
  title: `Quick Cart - Profile`,
};