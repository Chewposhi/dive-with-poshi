
import { BsFillMoonStarsFill } from "react-icons/bs";

import { GiScubaMask, GiScubaTanks, GiSpearfishing } from "react-icons/gi";

import Image from "next/image";
import profile from "../public/profie.jpg";

export default function Hero({ darkMode, setDarkMode }) {
    return (
        <section className="min-h-screen">
            <nav className="py-10 mb-12 flex justify-between dark:text-white">
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
            <div className="text-center p-10 py-10">
                <h2 className="text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
                    Chew Poshi
                </h2>
                <h3 className="text-2xl py-2 dark:text-white md:text-3xl">
                    Developer, Scuba Diver, Free Diver, Spear Fishingman
                </h3>
                <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
                    <GiScubaTanks />
                    <GiScubaMask />
                    <GiSpearfishing />
                </div>
                <p className="text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
                    Into all kinds water sports expecially diving, join me down below on my diving trips!
                </p>
                <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden mt-20 md:h-96 md:w-96">
                    <Image src={profile} layout="fill" objectFit="cover" />
                </div>
            </div>
        </section>
    );
}
