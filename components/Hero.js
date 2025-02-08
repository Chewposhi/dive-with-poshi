import React from "react";
import { GiScubaMask, GiScubaTanks, GiSpearfishing } from "react-icons/gi";
import Image from "next/image";
import profile from "../public/profie.jpg";
import Badge3D from "./Badge";
import { diveCerts } from "../constants/constants";

export default function Hero() {
  return (
    <section className="min-h-screen">
      <div className="text-center p-10 py-10">
        <h2 className="text-5xl py-2 text-teal-900 font-medium dark:text-teal-400 md:text-6xl">
          Chew Poshi
        </h2>
        <h3 className="text-2xl py-2 dark:text-white md:text-3xl">
          Developer | Scuba Diver | Free Diver | Spear Fisherman
        </h3>
        <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
          <GiScubaTanks />
          <GiScubaMask />
          <GiSpearfishing />
        </div>
        <p className="text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
          Into all kinds of water sports, especially diving. Join me down below on my diving trips!
        </p>
        <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden mt-10 md:h-96 md:w-96">
          <Image src={profile} layout="fill" objectFit="cover" />
        </div>
      </div>

      <h3 className="text-3xl py-4 text-teal-900 font-medium dark:text-teal-400 font-semibold text-center">
        Certifications
      </h3>

      <div className="mt-4 flex flex-wrap justify-center gap-10">
        {diveCerts.map((dive, index) => (
          <Badge3D cert={dive} key={index}/>
        ))}
      </div>
    </section>
  );
}
