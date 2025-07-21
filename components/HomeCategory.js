import React from 'react'
import { Button } from './ui/button';
import { ArrowRight } from "lucide-react";
import HomeCategoryCard from './HomeCategoryCard';
import Link from 'next/link';

const HomeCategory = ({ homeCategoryCards }) => {
  return (
    <>
      <div className="w-full mx-auto relative z-40  md:w-[90%] ">
        <div className=" w-full bg-white mx-auto   rounded-t-4xl flex flex-col py-5 px-5 md:py-8 md:px-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold md:text-2xl">
              Browse By Categories
            </h3>
              <Link href='/products/cid'>
            <Button className="hover:cursor-pointer">
                View All <ArrowRight />
            </Button>
              </Link>
          </div>
          <HomeCategoryCard homeCategoryCards={homeCategoryCards} />
        </div>
      </div>
    </>
  );
};

export default HomeCategory