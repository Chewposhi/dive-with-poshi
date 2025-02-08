// pages/index.js
import Head from "next/head";
import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Nav";
import Timeline from "../components/Timeline";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Dive with Poshi</title>
        <meta name="description" content="Follow Poshi on his dive trips" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add the Google Maps script here */}
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </Head>
      <main className="bg-gradient-to-r from-teal-300 to-cyan-400 px-10 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 md:px-10 lg:px-20 pt-16">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero darkMode={darkMode} setDarkMode={setDarkMode} />
        <Timeline />
      </main>
    </div>
  );
}
