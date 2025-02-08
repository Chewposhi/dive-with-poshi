// components/Navbar.js
import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";

const Navbar = ({ darkMode, setDarkMode }) => (
  <nav className="mb-12 flex justify-between dark:text-white">
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
