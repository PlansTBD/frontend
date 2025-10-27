"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const phrases = [
  "Oggi sei in o out?",
  "Are you in or out today?",
  "Aujourd’hui, tu es in ou out ?",
  "Bist du heute in oder out?",
  "Hoy, ¿estás in o out?"
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = phrases[currentPhraseIndex];
    if (displayedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, currentPhraseIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/experiences?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] text-center px-6 overflow-hidden">
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute w-[40rem] h-[40rem] bg-cyan-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        className="absolute w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-2xl top-40 right-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="pl-2 pr-2 text-5xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_25px_rgba(0,200,255,0.3)]"
      >
        Find your next <span className="italic">experience</span>
      </motion.h1>

      {/* Search bar */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative w-full max-w-xl flex items-center gap-2 p-4 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300"
      >
        <input
          type="text"
          placeholder={displayedText || "…"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-lg placeholder-gray-400 text-gray-100"
        />
<motion.button
  whileTap={{ scale: 0.95 }}
  type="submit"
  className="px-6 py-3 rounded-full cursor-pointer flex items-center gap-2 
             bg-white text-black font-semibold "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 text-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
  <span className="tracking-wide">Search</span>
</motion.button>

      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-5 text-gray-400 text-sm tracking-wider"
      >
        Discover, connect, and live unique experiences 
      </motion.p>
    </section>
  );
}
