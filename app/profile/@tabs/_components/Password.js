"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updatePassword } from "@/app/actions/user";
import { toast } from "sonner";

const Password = ({ loggedInUser }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(loggedInUser?.email, formData);
      toast.success("Password Updated Successfully!");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      toast.error("Failed to Update Password!");
       setFormData({
         oldPassword: "",
         newPassword: "",
         confirmNewPassword: "",
       });
      
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full flex justify-start items-start gap-5 flex-col  py-6 px-8 rounded-2xl shadow-lg shadow-zinc-800">
      <h3 className="text-xl font-medium">Change Password</h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-center items-center gap-10">
          <div className="grid w-[100%]  items-center gap-3">
            <Label className="text-md">
              Old Password :<span className="text-red-600">*</span>
            </Label>
            <Input
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              type="password"
              placeholder="Old Password"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-10">
          <div className="grid w-[100%]  items-center gap-3">
            <Label className="text-md">
              New Password :<span className="text-red-600">*</span>
            </Label>
            <Input
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              type="password"
              placeholder="New Password"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-10">
          <div className="grid w-[100%]  items-center gap-3">
            <Label className="text-md">
              Confirm New Password :<span className="text-red-600">*</span>
            </Label>
            <Input
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm New Password"
            />
          </div>
        </div>
        <Button type="submit" className="w-32 hover:cursor-pointer">
          Save Password
        </Button>
      </form>
    </div>
  );
};

export default Password;
