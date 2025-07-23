import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const CategoryCard = ({ allCategory }) => {
  return (
    <>
      <div className='flex justify-around items-center gap-10 flex-wrap py-10 w-full lg:justify-between'>
        {allCategory.map((category) => (
          <Link
            target="_blank"
            href={`/products/cid/${category?._id}`}
            key={category?._id}
          >
            <div className="w-70 h-70 rounded-4xl border-zinc-300 border-2 flex justify-center items-center sm:w-70 md:w-90">
              <div className="text-3xl font-medium flex justify-center items-center flex-col gap-3">
                <Image
                  className="rounded-full h-50 w-50 object-cover"
                  width={500}
                  height={500}
                  src={category?.categoryImage}
                  alt={category?.categoryName}
                />
                <h4 className="text-xl text-center">
                  {category?.categoryName}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryCard