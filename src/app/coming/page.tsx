"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeUntilNewYear> | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/1.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/2.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/3.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/4.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/5.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/6.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/7.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/8.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/9.jpg",
    "https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/10.jpg",
  ];

  function getTimeUntilNewYear() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear.getTime() - now.getTime();

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    setTimeLeft(getTimeUntilNewYear());

    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNewYear());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideshow = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(slideshow);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/users/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Email submit error", error);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Fullscreen background slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`bg-${idx}`}
            fill
            sizes="100vw"
            priority={idx === 0}
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
              idx === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered glass container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 md:p-10"
        >
          <div className="mb-1">
            <Image
              src="https://lkjtlxtlxwqnqhvwlaed.supabase.co/storage/v1/object/public/images/logo.png" // puoi anche usare PNG o un link esterno
              alt="OUT Logo"
              width={80}
              height={80}
              className="object-cover object-none mx-auto invert"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">We&apos;re Launching Soon</h1>
          <p className="text-sm md:text-base text-gray-200 mb-6">
            The Network will be live on January 1st. <br></br>
            Before the launch, <strong>leave your Email</strong> to get the <strong>best experiences every week around Italy.</strong>
          </p>

          {timeLeft && (
            <div className="flex justify-between text-sm md:text-base font-mono mb-6 text-white">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-2xl font-semibold">{String(value).padStart(2, "0")}</span>
                  <span className="text-xs uppercase text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Send me Experiences
              </button>
            </form>
          ) : (
            <p className="text-green-400 mt-4 text-sm">Thanks! We&apos;ll keep you posted 🚀</p>
          )}
        </motion.div>
      </div>

      {/* Footer text */}
      <footer className="absolute bottom-4 w-full text-center z-20">
        <p className="text-xs md:text-sm text-gray-300">
          ©2K26 <strong>OUT.</strong> CREATED BY <strong>UNKNOWN.</strong> <br /> </p>
          <p className="text-[12px] text-gray-300">A Real Made In Italy Network.</p>
        
      </footer>
    </main>
  );
}
