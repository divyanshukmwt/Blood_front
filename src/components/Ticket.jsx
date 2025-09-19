import React from 'react'

const Ticket = ({data}) => {
  return (
    <div className="border-2 w-fit px-4 py-3 rounded-md flex flex-col gap-y-2">
      <div className="flex gap-x-2 text-xl">
        <h1 className="font-Poppins">Title : </h1>
        <p className="font-Roboto">{data.ticketTitle}</p>
      </div>
      <p className='font-mono text-lg'>Data : <span className='text-sky-400 font-Roboto'>{data.date}</span></p>
      <p className='font-mono text-lg'>Time : <span className='text-sky-400 font-Roboto'>{data.time}</span></p>
      <p className="max-w-70 font-Roboto leading-5 text-lg">
        {data.ticketDescription}
      </p>
    </div>
  );
}

export default Ticket