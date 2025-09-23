import React from 'react'

const Scales = ({text,count, para, center=true}) => {
  return (
    <div className={`flex flex-col items-start ${center ? "lg:items-center": "lg:items-start"} gap-y-3 w-fit`}>
      <h3 className="text-3xl font-[oswald]">{text}</h3>
      <p className="text-3xl font-[oswald] text-red-600">
        {count}
        <span className="font-[oswald] text-3xl text-[#A1A1AA] font-semibold"> {para}</span>
      </p>
    </div>
  );
}

export default Scales