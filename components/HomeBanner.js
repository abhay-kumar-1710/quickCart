import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomeBanner = () => {
  return (
    <>
      <div className="w-[90%] mx-auto p-8 flex justify-start items-start flex-col gap-10 bg-zinc-800 mb-5 rounded-3xl">
        <h1 className="capitalize text-4xl font-medium text-white md:text-6xl lg:text-8xl">
          ready to get <br /> our new stuff?
        </h1>
        <div className="flex justify-between flex-col gap-5 items-end w-full lg:flex-row">
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input className={"text-black bg-white"} type="email" placeholder="Email" />
            <Button className={'hover:cursor-pointer'} type="submit" >
              Send
            </Button>
          </div>
          <div className="flex justify-center items-start flex-col gap-2">
            <h3 className="text-xl font-medium text-white md:text-2xl">
              Stuffs for Homes and needs
            </h3>
            <p className="text-sm text-white md:text-md">
              We will listen to your need Lorem ipsum, <br /> dolor sit amet
              consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBanner