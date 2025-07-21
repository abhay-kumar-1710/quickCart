import React from 'react'
import YouMightAlsoLikeCard from './YouMightAlsoLikeCard';

const YouMightAlsoLike = ({ randomRelatedProducts }) => {
  return (
    <div className="w-[90%] mx-auto  px-2 py-8 flex justify-start items-start md:px-12">
      <div className="w-full flex justify-center items-center flex-col gap-3">
        <h1 className="capitalize text-3xl font-medium md:text-6xl">
          you might also like
        </h1>
        <YouMightAlsoLikeCard randomRelatedProducts={randomRelatedProducts} />
      </div>
    </div>
  );
};

export default YouMightAlsoLike