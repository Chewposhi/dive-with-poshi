// pages/index.js
import Head from "next/head";
import { useState } from "react";
import Hero from "../components/Hero"; // Import the Hero component
import Navbar from "../components/Nav"; // Import the Navbar component

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Dive with Poshi</title>
        <meta name="description" content="Follow Poshi on his dive trips" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-r from-teal-300 to-cyan-400 px-10 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 md:px-20 lg:px-40 pt-20">
        {/* Add padding-top (pt-20) to prevent content from being hidden behind the fixed navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero darkMode={darkMode} setDarkMode={setDarkMode} />
      </main>
    </div>
  );
}
