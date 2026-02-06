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
      className="flex justify-center items-center w-full min-h-screen
                 bg-black bg-center bg-cover overflow-hidden px-4"
      style={{ backgroundImage: `url(${backimg})` }}
    >
      <div className="flex flex-col items-center text-center max-w-xl w-full">
        
        {/* IMAGE SECTION */}
        <div className="relative 
                        w-[240px] sm:w-[300px] md:w-[360px]">
          <img src={img} alt="" className="w-full" />

          <img
            src={logo}
            alt=""
            className="absolute top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2
                       w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                       rounded-full backdrop-blur-sm"
          />

          <img
            src={logo2}
            alt=""
            className="absolute top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2
                       w-16 sm:w-20 md:w-24"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-white font-semibold mt-4
                       text-xl sm:text-2xl md:text-3xl">
          Welcome to Chef Kitchen
        </h1>

        {/* DESCRIPTION */}
        <h3 className="font-[Arial] text-white/60 leading-relaxed mt-2
                       text-sm sm:text-base md:text-lg">
          Check out the awesome food experience! It's <br />
          super fresh, quick, and oh-so tasty!
        </h3>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/login")}
          className="bg-amber-500 text-white 
                     mt-6 px-8 sm:px-10 md:px-12 py-3
                     rounded-lg text-sm sm:text-base
                     hover:bg-amber-400 transition"
        >
          Explore Menu
        </button>

      </div>
    </div>
  );
}

export default Home;
