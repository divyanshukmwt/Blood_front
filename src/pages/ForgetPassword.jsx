import Axios  from '../config/Axois';
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { receiveMessage, sendMessage } from '../config/Socket';
import { TbEyeCancel } from "react-icons/tb";
import { TbEyeCheck } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const pass = useRef(null);
    const [show, setshow] = useState(true);
    const [email, setEmail] = useState("");
    const [otp, setotp] = useState("");
    const [password, setpassword] = useState("");
    const [modal, setmodal] = useState(false);
    const [passModal, setpassModal] = useState(false);
    const [err, seterr] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailHandeler = async e => {
      e.preventDefault();
      if (emailRegex.test(email)) {
        setmodal(true);
        toast.success("OTP send your Email, please cheack inbox or spam.");
        await Axios.post("/users/forgetPass", {email});
      } else {
        toast.error("Input not Valid.");
        setmodal(false);
      }
    }
    const otpHandeler = (e)=>{
      e.preventDefault();
      if (otp.length == 4 && emailRegex.test(email)) {
        toast.info("Wait until we verify.");
        sendMessage("otp-sender", {email, otp});
      } else {
        toast.error("Input not Valid.");
        setpassModal(false);
      }
    }
    useEffect(() => {
    receiveMessage("otp-result", (data)=>{
      if(data.result){
        setpassModal(data.result);
      } else {
        setpassModal(data.result);
      }
    });
    }, [])
    const passwordHandel = async () => {
      if (passregex.test(password)) {
        try {
          const res = await Axios.post("/users/updatePassword", {
            email,
            otp,
            password,
          });
          console.log(res);
          if (res.status === 200) {
            seterr(false);
            toast.success("Password changed successfully.");
            navigate("/login");
          }
        } catch (error) {
          if (error.response?.status === 409) {
            seterr(false);
            toast.info("Do not reuse your previous password. Try a new one.");
          } else if (error.response?.status === 401) {
            seterr(true);
            toast.error("Invalid or expired OTP.");
          } else {
            seterr(true);
            toast.error("Something went wrong. Please try again.");
          }
        }
      } else {
        seterr(true);
        toast.error("Password format is invalid.");
      }
    };
    
  return (
    <div className="text-white w-full h-screen flex items-center justify-center">
      <div className="relative px-4 pt-6 pb-30 w-[90%] lg:w-[30%] rounded-md flex flex-col gap-y-7 items-center border-2 border-zinc-900 bg-zinc-900/90">
        <h1 className="text-xl uppercase font-Poppins">Forget Password</h1>
        <div className="w-full relative">
          <div className="w-full flex h-10 bg-zinc-700/40 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Email..."
              className="w-full border-none outline-none px-2"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.trim());
              }}
            />
            <button
              onClick={emailHandeler}
              className="whitespace-nowrap px-2 bg-black/70 cursor-pointer">
              Send OTP
            </button>
          </div>
          {passModal && (
            <p className="text-sm text-green-500 text-left w-full pl-2 absolute">
              your Account is verified.
            </p>
          )}
        </div>
        {modal && (
          <div className="bg-zinc-700/40 h-10 flex w-full rounded-md overflow-hidden">
            <input
              type="number"
              placeholder="OTP here..."
              className="w-full border-none outline-none px-2"
              value={otp}
              onChange={(e) => {
                setotp(e.target.value.trim());
              }}
            />
            <button
              onClick={otpHandeler}
              className="whitespace-nowrap px-2 bg-black/70 cursor-pointer">
              Verify OTP
            </button>
          </div>
        )}
        {passModal && (
          <div className="relative w-full">
            <div className="w-full flex h-10 rounded-md bg-zinc-800 overflow-hidden">
              <div className="relative w-full h-full">
                <input
                  type={show ? "password" : "text"}
                  placeholder="New Password here..."
                  className="w-full px-2 h-full border-none outline-none"
                  autoComplete='true'
                  ref={pass}
                  value={password}
                  onChange={(e) => setpassword(e.target.value.trim())}
                />
                <button
                  onClick={() => setshow(!show)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xl">
                  {show ? (
                    <TbEyeCancel className="text-red-400/70" />
                  ) : (
                    <TbEyeCheck className="text-green-400/70" />
                  )}
                </button>
              </div>
              <button
                onClick={passwordHandel}
                className="whitespace-nowrap px-2 bg-black/70 cursor-pointer">
                Confirm
              </button>
            </div>
            {err && (
              <p className="absolute text-red-400/90">
                Password must be at least 8 characters and include uppercase,
                lowercase, number, and special character
              </p>
            )}
          </div>
        )}
        <p className="absolute bottom-1 font-Poppins">
          Go To Login :{" "}
          <Link className="text-blue-400" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword