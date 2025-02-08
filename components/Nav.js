// components/Navbar.js
import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";

const Navbar = ({ darkMode, setDarkMode }) => (
  <nav className="sticky top-5 z-50 flex justify-between items-center w-full dark:text-white pb-4">
    <h1 className="font-burtons text-xl">divewithposhi</h1>
    <ul className="flex items-center">
      <li>
        <BsFillMoonStarsFill
          onClick={() => setDarkMode(!darkMode)}
          className="cursor-pointer text-2xl"
        />
      </li>
    </ul>
  </nav>
);

export default Navbar;
