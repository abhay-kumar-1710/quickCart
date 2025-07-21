"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { updateAddress } from "@/app/actions/address";


const Address = ({ loggedInUser, userAddress }) => {
 
  

  const [formData, setFormData] = useState({
    streetName: userAddress?.streetName || "",
    landMark: userAddress?.landMark || "",
    city: userAddress?.city || "",
    pinCode: userAddress?.pinCode || "",
    state: userAddress?.state || "",
    userId: loggedInUser?._id || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateAddress(loggedInUser._id, formData);
      toast.success("User Address Updated!")
    } catch (error) {
       toast.error("Failed to Update User Address!");
    }
  };

  return (
    <div className="w-full flex justify-start items-start gap-5 flex-col  py-6 px-8 rounded-2xl shadow-lg shadow-zinc-800">
      <h3 className="text-xl font-medium">Change Address Details</h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <>
          <div className="w-full flex justify-center items-center gap-10">
            <div className="grid w-[100%]  items-center gap-3">
              <Label className="text-md">
                Street Number / Name :<span className="text-red-600">*</span>
              </Label>
              <Input
                name="streetName"
                value={formData.streetName}
                onChange={handleChange}
                type="text"
                placeholder="Street Number / Name"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-10">
            <div className="grid w-[100%]  items-center gap-3">
              <Label className="text-md">
                Landmark :<span className="text-red-600">*</span>
              </Label>
              <Input
                name="landMark"
                value={formData.landMark}
                onChange={handleChange}
                type="text"
                placeholder="Landmark"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-10">
            <div className="grid w-[100%]  items-center gap-3">
              <Label className="text-md">
                City :<span className="text-red-600">*</span>
              </Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="City"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-10">
            <div className="grid w-[100%]  items-center gap-3">
              <Label className="text-md">
                Pin code :<span className="text-red-600">*</span>
              </Label>
              <Input
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                type="text"
                placeholder="Pin code"
              />
            </div>
          </div>
          <Button type="submit" className="w-34 hover:cursor-pointer">
            Save Address
          </Button>
        </>
      </form>
    </div>
  );
};

export default Address;
