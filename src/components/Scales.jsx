import React from 'react'

const Scales = ({text,count, para, center=true}) => {
  return (
    <div className={`flex flex-col items-start ${center ? "lg:items-center": "lg:items-start"} gap-y-3 w-fit`}>
      <h3 className="text-4xl font-Poppins">{text}</h3>
      <p className="text-5xl font-Poppins text-[#5BC0EB]">
        {count}
        <span className="font-Roboto text-4xl text-[#A1A1AA] font-semibold"> {para}</span>
      </p>
    </div>
  );
}

export default Scales