"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const leftLinks = [
  { label: "Scopri", href: "#" },
  { label: "Eventi", href: "#" },
];

const rightLinks = [
  { label: "About", href: "#" },
];

const cities = ["Milan", "New York"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("Milan");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tbd_city");
    if (saved) setCity(saved);
  }, []);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    localStorage.setItem("tbd_city", newCity);
    setDropdownOpen(false);
    // Ricarica i dati
    window.location.reload();
  };

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%]
                   flex items-center justify-between px-8 py-4 
                   rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 
                   shadow-[0_0_25px_rgba(255,255,255,0.05)]
                   text-gray-100 z-50"
      >
        {/* Desktop */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Left links */}
          <div className="flex gap-8 text-sm font-medium tracking-wide">
            {leftLinks.map((link, i) => (
              <Link key={i} href={link.href} className="relative group transition">
                <span className="group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Logo centrale */}
          <Link href={"/"} className="relative group transition">
            <motion.div
              transition={{ type: "spring", stiffness: 300 }}
              className="text-3xl font-extrabold tracking-widest text-white cursor-pointer select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            >
              TBD.
            </motion.div>
          </Link>

          {/* Right area: dropdown + links */}
          <div className="flex items-center gap-6">
            {/* City dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
              >
                <span>{city}</span>
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="cursor-pointer absolute right-0 mt-2 bg-black/80 border border-white/10 rounded-xl overflow-hidden shadow-lg backdrop-blur-xl">
                  {cities.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleCityChange(c)}
                      className={`cursor-pointer block px-4 py-2 w-full text-left hover:bg-white/10 ${
                        city === c ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other links */}
            <div className="flex gap-8 text-sm font-medium tracking-wide">
              {rightLinks.map((link, i) => (
                <Link key={i} href={link.href} className="relative group transition">
                  <span className="group-hover:text-white transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between md:hidden">
          {/* Logo left */}
          <Link href={"/"}>
            <div className="text-2xl font-bold text-white tracking-widest">TBD.</div>
          </Link>

          {/* Hamburger right */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white/80 hover:text-white transition"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%]
                       rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 
                       text-gray-100 z-50 flex flex-col justify-between overflow-hidden"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-8 text-2xl font-semibold items-center pb-10">
              {[...leftLinks, ...rightLinks].map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="hover:text-white transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* City picker also in mobile */}
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2">Seleziona città:</p>
                <select
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="cursor-pointer bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-base"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-400 text-sm py-6 border-t border-white/10">
              <div className="flex justify-center gap-6 mb-2">
                <Link href="#" className="hover:text-white transition">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-white transition">
                  Terms
                </Link>
              </div>
              <p className="text-gray-500">© 2025 OUT. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
