import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black" />
    </div>
  );
}

export default Loader