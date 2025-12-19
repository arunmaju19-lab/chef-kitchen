import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/img2.svg";
import logo from "../assets/images/img3.svg";
import logo2 from "../assets/images/logo.svg";
import backimg from "../assets/back.svg";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center w-full h-screen 
                 bg-black bg-center bg-cover overflow-hidden "
      style= {{ backgroundImage: `url(${backimg})` }}
    >
      <div className="flex flex-col items-center text-center  px-6 ">
        
        {/* Image Section */}
        <div className="relative w-[260px]">
          <img src={img} alt="" className="w-full" />

          <img
            src={logo}
            alt=""
            className="absolute top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2 w-28 h-28 
                       rounded-full backdrop-blur-sm"
          />

          <img
            src={logo2}
            alt=""
            className="absolute top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl font-semibold mt-4">
          Welcome to Chef Kitchen
        </h1>

        {/* Description */}
        <h3 className="font-[Arial] text-[15px] text-white/60 leading-relaxed">
          Check out the awesome food experience! It's <br />
          super fresh, quick, and oh-so tasty!
        </h3>

        {/* Button */}
        <button
          onClick={() => navigate("/menu")}
          className="bg-amber-500 text-white 
                     mt-6 px-12 py-3 rounded-lg
                     hover:bg-amber-400 transition"
        >
          Explore Menu
        </button>

      </div>
    </div>
  );
}

export default Home;
