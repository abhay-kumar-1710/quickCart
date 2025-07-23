import React from 'react'
import PageLocation from './_components/PageLocation'
import AllProductsByCategory from './_components/AllProductsByCategory'
import { getAllCategory } from '@/query/category'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

const page = async() => {

    const allCategory = await getAllCategory()
    // console.log(allCategory);
    
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <div className="pt-35">
          <PageLocation />
          <AllProductsByCategory allCategory={allCategory} />
        </div>
      </Suspense>
    </>
  );
}

export default page

export const metadata = {
  title: `Quick Cart - Explore By Category`,
};