import Head from "next/head";
import { useState } from "react";
import Hero from "../components/Hero"; // Import the Hero component

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Dive with Poshi</title>
        <meta name="description" content="Follow Poshi on his dive trips" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white px-10 dark:bg-gray-900 md:px-20 lg:px-40">
        <Hero darkMode={darkMode} setDarkMode={setDarkMode} />
      </main>
    </div>
  );
}
