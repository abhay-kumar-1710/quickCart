"use client";
import React from "react";

import SignUpForm from "./_components/SignUpForm";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="h-screen w-[90%] mx-auto  flex justify-center items-center">
        <SignUpForm />
      </div>
    </Suspense>
  );
};

export default page;
