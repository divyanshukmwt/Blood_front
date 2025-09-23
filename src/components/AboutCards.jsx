import React from 'react'

const AboutCards = ({ src, name, role, para }) => {
  return (
<div className="border-2 border-gray-200 rounded py-2 px-2 flex flex-col lg:flex-row-reverse gap-x-4 gap-y-2 items-center justify-between bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
  {/* Profile Image */}
  <div className="w-full lg:w-1/3 aspect-square overflow-hidden rounded-full border-2 border-gray-300">
    <img
      src={src}
      alt="Profile Pic"
      className="object-cover h-full w-full object-[0%_10%] transition-transform duration-300 lg:hover:scale-110"
    />
  </div>

  {/* Info Section */}
  <div className="flex flex-col gap-y-2 w-full lg:w-2/4 lg:gap-y-5">
    <h1 className="text-3xl font-bold font-[oswald] text-gray-800">{name}</h1>
    <h1 className="text-2xl font-semibold font-[oswald] text-gray-700">
      Role: <span className="text-gray-500">{role}</span>
    </h1>
    <h1 className="text-2xl font-semibold font-[oswald] text-gray-700">
      Department: <span className="text-gray-500">BCA</span>
    </h1>
    <h1 className="text-2xl font-semibold font-[oswald] text-gray-700">
      College: <span className="text-gray-500">Maharshi Arvind School of Management Studies</span>
    </h1>
    <p className="text-2xl font-[oswald] text-gray-600">{para}</p>
  </div>
</div>


  );
}

export default AboutCards