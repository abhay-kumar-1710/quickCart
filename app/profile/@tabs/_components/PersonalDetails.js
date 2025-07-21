"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getUserDetailsUpdated } from "@/app/actions/user";

const PersonalDetails = ({ loggedInUser }) => {

  
  const [formData, setFormData] = useState({
    firstName: loggedInUser?.firstName,
    lastName: loggedInUser?.lastName,
    email: loggedInUser?.email,
    phoneNumber: loggedInUser?.phoneNumber ? loggedInUser?.phoneNumber : '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
    await getUserDetailsUpdated(loggedInUser?.email, formData);
      toast.success("User Details Updated!")
        // console.log("Submitting form with:", formData, loggedInUser?.email);
    } catch (error) {
       toast.error("Failed to Update User Details!");
      //  console.log(error);
       
    }

  }

  return (
    <div className="w-full flex justify-start items-start gap-5 flex-col  py-6 px-8 rounded-2xl shadow-lg shadow-zinc-800">
      <h3 className="text-xl font-medium">Personal Details</h3>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <>
          <div className="w-full flex justify-between items-center gap-10 flex-col sm:flex-row">
            <div className="grid w-[100%] sm:w-[80%]  items-center gap-3">
              <Label className="text-md">
                First Name :<span className="text-red-600">*</span>
              </Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="grid w-[100%] sm:w-[80%] items-center gap-3">
              <Label className="text-md">
                Last Name :<span className="text-red-600">*</span>
              </Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-10 flex-col sm:flex-row">
            <div className="grid w-[100%] sm:w-[80%]  items-center gap-3">
              <Label className="text-md">
                Email :<span className="text-red-600">*</span>
              </Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="text"
                disabled
                placeholder="Email"
              />
            </div>
            <div className="grid w-[100%] sm:w-[80%]  items-center gap-3">
              <Label className="text-md">Phone Number :</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <Button type="submit" className="w-32 hover:cursor-pointer">
            Save Details
          </Button>
        </>
      </form>
    </div>
  );
};

export default PersonalDetails;
