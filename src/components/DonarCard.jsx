import DonateForm from './DonateForm';

const DonarCard = ({ data, btn, fn }) => {
  return (
    <>
      <DonateForm
        modal={btn}
        dataId={data._id}
        modalfn={fn}
        name={data.reciventId.name}
      />
      <div className="w-full flex flex-col gap-y-4 border border-gray-300 hover:border-sky-400 hover:shadow-md hover:shadow-sky-200/50 duration-200 rounded-lg p-5 bg-white">
        <div className="flex flex-col gap-y-2">
          <div className="w-full h-fit flex justify-between items-start">
            <div className="w-20 aspect-square overflow-hidden rounded-full border border-gray-200">
              <img
                src={`data:${data.reciventId.pictype};base64,${data.reciventId.profilepic}`}
                alt="Profile Image"
                className="w-full h-full object-cover"
              />
            </div>
            {data.urgency === "high" ? (
              <p className="bg-rose-100 px-4 font-Poppins font-bold text-sm rounded-full uppercase text-rose-600">
                High
              </p>
            ) : data.urgency === "Medium" ? (
              <p className="bg-amber-100 px-4 font-Poppins font-bold text-sm rounded-full uppercase text-amber-600">
                Medium
              </p>
            ) : data.urgency === "Low" ? (
              <p className="bg-green-100 px-4 font-Poppins font-bold text-sm rounded-full uppercase text-green-600">
                Low
              </p>
            ) : (
              "Unknown"
            )}
          </div>
          <h1 className="font-Poppins text-2xl text-gray-800">
            Name: <span className="text-yellow-600">{data.reciventId.name}</span>
          </h1>
        </div>
        <h4 className="font-Roboto text-xl text-gray-700">
          Required : <span className="text-red-500">{data.bloodType}</span>
        </h4>
        <h4 className="font-Roboto text-xl text-gray-700">
          Date : <span className="text-sky-500">{data.date}</span>
        </h4>
        <h4 className="font-Roboto text-xl text-gray-700">
          Time : <span className="text-sky-500">{data.time}</span>
        </h4>
        <button
          onClick={() => fn(true)}
          className="bg-sky-500 hover:bg-sky-600 rounded-lg uppercase font-bold py-4 font-Poppins cursor-pointer tracking-widest text-xl transition-all duration-200 text-white shadow"
        >
          Donate
        </button>
      </div>
    </>

  );
}

export default DonarCard