import React from 'react'
import CategoryCard from './CategoryCard'

const AllProductsByCategory = ({ allCategory }) => {
  return (
    <>
      <div className="w-[90%] mx-auto">
        <CategoryCard allCategory={allCategory} />
      </div>
    </>
  );
};

export default AllProductsByCategory