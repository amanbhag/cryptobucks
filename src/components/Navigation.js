import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="lg:w-[40%] sm:w-[80%] w-[90%] flex justify-around align-middle lg:mt-16 sm:mt-24 mt-20 border border-solid border-cyan sm:rounded-lg rounded-md">
      <NavLink
        to="/"
        end
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5 ${
            isActive
              ? "bg-cyan text-gray-300"
              : "bg-gray text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
          }   boder-0 cursor-pointer rounded  capitalize font-semibold`;
        }}
      >
        Crypto
      </NavLink>
      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5 ${
            isActive
              ? "bg-cyan text-gray-300"
              : "bg-gray text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
          }   boder-0 cursor-pointer rounded  capitalize font-semibold`;
        }}
      >
        Trending
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5 ${
            isActive
              ? "bg-cyan text-gray-300"
              : "bg-gray text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
          }   boder-0 cursor-pointer rounded  capitalize font-semibold`;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
};

export default Navigation;
