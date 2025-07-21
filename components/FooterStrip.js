import React from 'react'

const FooterStrip = () => {
  return (
    <>
      <div className="w-full py-5  border-zinc-300 border-t-2 flex justify-between items-center px-5 gap-2 flex-col sm:flex-row md:px-12 lg:px-14 xl:px-16 2xl:px-24">
        <span className="text-sm">
          Copyright &copy;2025 Abhay Kumar. All Rights are reserved.
        </span>
        <div className="flex justify-center items-center gap-5">
          <span className="text-sm">Terms of Service</span>
          <span className="text-sm">Privacy Policy</span>
        </div>
      </div>
    </>
  );
}

export default FooterStrip