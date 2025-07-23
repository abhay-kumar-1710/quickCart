import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-30 h-30 md:w-20 md:h-20 bg-black rounded-full animate-spin text-white flex justify-center items-center">
        <span className="text-3xl font-medium">QC</span>
      </div>
    </div>
  );
}

export default Loader