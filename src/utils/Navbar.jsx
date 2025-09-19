import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbMenu } from "react-icons/tb";
import { CgCloseR } from "react-icons/cg";

const Navbar = ({ field, animateRef }) => {
  const [sidenav, setSidenav] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    if (sidenav) {
      ref.current.classList.add("left-0");
      ref.current.classList.remove("left-[100%]");
    } else {
      ref.current.classList.remove("left-0");
      ref.current.classList.add("left-[100%]");
    }
  }, [sidenav]);

  const handleNavigate = async (link) => {
    setSidenav(false);
    if (animateRef?.current?.reverseAnimation) {
      await animateRef.current.reverseAnimation();
    }
    navigate(link);
  };

  const handleLogOut = async (link) => {
    if (animateRef?.current?.reverseAnimation) {
      await animateRef.current.reverseAnimation();
    }
    if (link === "/adminLogout") {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    } else {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  return (
    <div className="w-full pr-5 lg:pr-20 py-4 flex justify-end backdrop-blur-sm fixed top-0 z-40">
      <div className="hidden lg:flex gap-10 text-xl font-inter font-medium cursor-pointer text-white">
        {field.map((item, index) =>
          item.name !== "Logout" ? (
            <button
              key={index}
              onClick={() => handleNavigate(item.link)}
              >
              {item.name}
            </button>
          ) : (
            <button
              key={index}
              onClick={() => handleLogOut(item.link)}
              >
              Logout
            </button>
          )
        )}
      </div>

      <div className="block lg:hidden text-4xl text-white cursor-pointer">
        <TbMenu onClick={() => setSidenav(true)} />
      </div>

      <div
        ref={ref}
        className="fixed flex flex-col items-center justify-center gap-y-15 text-4xl uppercase transition-all duration-300 ease-in-out bg-black text-white top-0 left-[100%] w-full h-screen z-50 lg:hidden">
        <CgCloseR
          onClick={() => setSidenav(false)}
          className="absolute top-5 right-5 text-5xl"
        />
        {field.map((item, index) =>
          item.name !== "Logout" ? (
            <button
              key={index}
              onClick={() => handleNavigate(item.link)}
              className="my-4">
              {item.name}
            </button>
          ) : (
            <button
              key={index}
              onClick={() => handleLogOut(item.link)}
              className="my-4">
              Logout
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
