import { useContext, useRef } from 'react'
import Navbar from '../utils/Navbar'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Animate from "../components/Animate";
import Footer from "../components/Footer";
import { UserContext } from '../context/user.context';
import { toast } from 'react-toastify';
import Axios from "../config/Axois";
import AbandonWord from "../utils/AbandonWord";
const ContactUs = () => {
  const animateRef = useRef();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();
    const onSubmit = async (data) => {
      console.log(data);
      reset();
      const res = await Axios.post("/users/contactUs",{name:user.name,email: user.email,message:data.message});
      if(res.status == 200){
        toast.success("Successfuly send.");
        navigate("/users/profile");
      } else {
        toast.error("Something went wrong!");
      }
    };
  return (
    <Animate ref={animateRef}>
      <div className="w-full min-h-screen bg-black">
        <Navbar
          animateRef={animateRef}
          field={[
            { link: "/users/profile", name: "Profile" },
            { link: "/", name: "Home" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/reciver/blood", name: "Blood" },
            { link: "/about", name: "About" },
          ]}
        />
        <div className="w-full min-h-screen flex justify-center lg:py-20 items-center text-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-zinc-900 px-7 py-10 w-[90%] lg:w-[40%]">
            <h1 className="text-center font-Poppins text-3xl lg:text-2xl">
              Contact Us
            </h1>
            <div>
              <label className="font-Poppins text-xl" htmlFor="name">
                Name:
              </label>
              <input
                {...register("name")}
                className="font-Roboto mt-2 outline-none border p-2 rounded w-full "
                placeholder="Enter your name..."
                type="text"
                id="name"
                value={user.name}
                readOnly
              />
              {errors.name && (
                <p className="text-[#FF3B30]">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="font-Poppins text-xl" htmlFor="email">
                Email:
              </label>
              <input
                placeholder="Enter your email..."
                id="email"
                type="email"
                value={user.email}
                readOnly
                {...register("email")}
                className="font-Roboto mt-2 border p-2 rounded w-full outline-none"
              />
              {errors.email && (
                <p className="text-[#FF3B30]">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="font-Poppins text-xl" htmlFor="message">
                Message:{" "}
              </label>
              <textarea
                id="message"
                className="font-Roboto border p-2 mt-2 resize-none rounded w-full outline-none h-50"
                placeholder="Enter your message..."
                {...register("message", {
                  required: "Message is required",
                  validate: (value) => {
                    const lowerValue = value.toLowerCase();
                    const hasBadWord = AbandonWord.some((bad) =>
                      lowerValue.includes(bad)
                    );
                    return hasBadWord
                      ? "Message contains restricted or offensive words!"
                      : true;
                  },
                })}></textarea>
              {errors.message && (
                <p className="text-[#FF3B30]">{errors.message.message}</p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </Animate>
  );
}

export default ContactUs