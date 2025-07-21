
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const HomeCategoryCard = ({ homeCategoryCards }) => {

  return (
    <>
      <div className="w-full py-5 flex justify-evenly items-center flex-wrap gap-10">
        {homeCategoryCards.map((category) => (
          <Link target='_blank' href={`/products/cid/${category?._id}`} key={category?._id}>
            <div className="w-70 h-70 rounded-4xl border-zinc-300 border-2 flex justify-center items-center">
              <div className="text-3xl font-medium flex justify-center items-center flex-col gap-3">
                <Image
                  className="rounded-full h-50 w-50 object-cover"
                  width={500}
                  height={500}
                  src={category?.categoryImage}
                  alt={category?.categoryName}
                />
                <h4 className='text-xl text-center'>{category?.categoryName}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomeCategoryCard