import React from 'react'
import PageLocation from './_components/PageLocation'
import AllProductsByCategory from './_components/AllProductsByCategory'
import { getAllCategory } from '@/query/category'

const page = async() => {

    const allCategory = await getAllCategory()
    // console.log(allCategory);
    
  return (
    <>
      <div className="pt-35">
        <PageLocation />
        <AllProductsByCategory allCategory={allCategory} />
      </div>
    </>
  );
}

export default page

export const metadata = {
  title: `Quick Cart - Explore By Category`,
};