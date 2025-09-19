import React from 'react'

const Para = ({H6,Icon,Para}) => {
  return (
    <div className="flex flex-col lg:mx-20 text-[#FFFFFF] items-start justify-center lg:bg-[#121212] gap-y-4 lg:border-2 border-zinc-700 lg:rounded-lg lg:py-4 w-fit lg:gap-y-5 px-4 lg:px-10">
      <h6 className="text-5xl font-Poppins font-bold flex gap-x-2">
        {Icon}
        {H6}
      </h6>
      <p className="font-Roboto text-3xl italic opacity-75 text-[#A1A1AA] px-2">
        {Para}
      </p>
    </div>
  );
}

export default Para