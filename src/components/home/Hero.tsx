"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/experiences?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6 overflow-hidden">
      {/* lighter orb */}
      <motion.div
        className="absolute w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-2xl will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
        animate={{ x: [0, 50, -50, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight px-4">
        Find your next <span className="italic">experience</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl flex items-center gap-2 p-4 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl transition-all"
      >
        <input
          type="text"
          placeholder="Are you in or out today?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-lg placeholder-gray-400 text-gray-100"
        />
        <button
          type="submit"
          className="px-3 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="black" width="20px" height="20px"><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
        </button>
      </form>

      <p className="mt-5 text-gray-400 text-sm tracking-wider">
        Discover, connect, and live unique experiences
      </p>
    </section>
  );
}
