import React from "react";

import LoginForm from "./_components/LoginForm";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="h-screen w-[90%] mx-auto  flex justify-center items-center">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default page;

export const metadata = {
  title: `Quick Cart - Login`,
};
