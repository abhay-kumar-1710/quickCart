"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
    role : "user" 
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // console.log(data.message);
      // console.log("Register Successfully!");
      router.push("/login");
    } else {
      // console.log(data.message);
          toast.error(data.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  return (
    <div className="h-screen w-[90%] mx-auto  flex justify-center items-center">
      <Card className="w-full max-w-md  border-zinc-300 shadow-2xl shadow-zinc-800">
        <CardHeader>
          <CardTitle>Sign Up to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex justify-center items-center gap-2">
                <div className="grid gap-2">
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Last Name</Label>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Confirm Password</Label>
                </div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  name="confirmPassword"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
