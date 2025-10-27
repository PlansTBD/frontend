"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MediaPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col mt-16">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-24 gap-12 relative overflow-hidden">
        {/* Geometric background */}
        <div className="absolute inset-0 -z-10">
          <div className="w-72 h-72 bg-white/10 rounded-full absolute top-[-5rem] left-[-5rem]"></div>
          <div className="w-96 h-96 bg-white/5 rounded-3xl absolute bottom-[-10rem] right-[-10rem] rotate-12"></div>
        </div>

        {/* Left: text */}
        <div className="flex-1 space-y-6">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold"
          >
            Press & Media Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-lg"
          >
            Access our logos, press kit, and brand guidelines. We carefully review all inquiries.
          </motion.p>
          <div className="flex gap-4 mt-4">
            <motion.a
              href="/downloads/logo.zip"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white text-black rounded-full font-semibold shadow-lg"
            >
              Download Logos
            </motion.a>
            <motion.a
              href="/downloads/presskit.pdf"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 border border-white rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Press Kit
            </motion.a>
          </div>
        </div>

        {/* Right: image */}
        <div className="flex-1 hidden md:flex justify-center">
          <motion.img
            src="/img/media-geometric.png"
            alt="Media Illustration"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white text-black py-24 px-8 md:px-32 rounded-t-6xl relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Request Access
        </motion.h2>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="flex-1 flex flex-col gap-4">
              <select className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                <option>Partnership Inquiry</option>
                <option>Journalist / Media</option>
                <option>Other</option>
              </select>
              <textarea
                placeholder="Your message..."
                className="p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-gray-700"
          >
            Thank you for your submission. We’ll contact you if relevant.
          </motion.div>
        )}

        {/* Decorative shapes */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-black/10 rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/5 rounded-3xl rotate-12"></div>
      </section>

      <footer className="text-gray-500 text-center py-12">
        © 2025 Anonymous Company. All rights reserved.
      </footer>
    </main>
  );
}
