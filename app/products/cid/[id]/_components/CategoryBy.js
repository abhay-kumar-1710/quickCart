import Link from "next/link";
import React from "react";

// const categories = ['mobiles', 'laptops', 'top wear', 'bottom wear']

const CategoryBy = ({ categories }) => {
  return (
    <div className="w-[90%] mx-auto py-4 px-8">
      <div className="w-full flex justify-start items-center gap-5 flex-wrap">
        {categories.map((category) => (
          <Link
            target="_blank"
            key={category?._id}
            href={`/products/cid/${category?._id}`}
          >
            <span className="text-[14px] bg-zinc-300 px-2 py-1 rounded-md font-semibold capitalize">
              {category?.categoryName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBy;
