"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function EmailGateModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tbd_user_email") : null;
    if (!saved) setShow(true);
  }, []);

  useEffect(() => {
    if (show) inputRef.current?.focus();
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  const valid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
  if (!valid) {
    setError("Please enter a valid email");
    return;
  }

  try {
    setPending(true);

    // ✅ chiamata alla route server-side sicura
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "Saving failed. Please try again.");
      return;
    }

    // ✅ salva localmente per ricordare l’utente
    localStorage.setItem("tbd_user_email", email);

    setSubmitted(true);
    setTimeout(() => setShow(false), 900);
  } catch (err) {
    console.error(err);
    setError("Network error, please try again.");
  } finally {
    setPending(false);
  }
};


  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0F1A] to-black p-6 shadow-[0_10px_60px_rgba(0,0,0,0.6)]"
            initial={{ y: 22, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2 text-center">
                  <h2 className="text-[22px] font-semibold tracking-tight text-white">
                    Are you in or out today?
                  </h2>
                  <p className="text-sm text-slate-300">
                    Drop your email to unlock curated picks in your city.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-2xl bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-cyan-400/60"
                    />
                  </div>
                  {error && <p className="text-sm text-rose-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-black transition hover:bg-cyan-400 disabled:opacity-60"
                  >
                    {pending ? "Just a sec…" : "Enter"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="w-full text-center text-sm text-slate-400 underline underline-offset-4 hover:text-slate-200"
                  >
                    Continue without email
                  </button>
                  <p className="text-center text-[11px] text-slate-400">
                    By continuing you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center">
                <p className="text-emerald-400">Done! Personalizing your picks ✨</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

