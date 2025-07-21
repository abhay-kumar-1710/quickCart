import React from 'react'

const HeroSection = () => {
  return (
    <div className="h-[50vh]  w-full relative z-10 md:h-[70vh]">
      <div className="w-full h-full absolute bg-black opacity-50 z-30"></div>
      <img
        className="w-full h-full object-cover opacity-[95%]"
        src={"https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg"}
      />
      <h1 className="absolute -bottom-10 text-white text-[35vw] font-semibold left-1/2 transform -translate-x-1/2 z-30 opacity-80 md:-bottom-12 md:text-[25vw] sm:-bottom-10 lg:-bottom-15 xl:-bottom-35 ">
        Shop
      </h1>
    </div>
  );
}

export default HeroSection