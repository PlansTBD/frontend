"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // invio via EmailJS o Formspree
    setSubmitted(true);
  };

  return (
    <main className="bg-white text-black min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="mb-8 text-gray-700 max-w-xl text-center">
        Reach out to us with any questions or inquiries. We'll respond as soon as possible.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
          <input type="text" placeholder="Your Name" required className="p-3 border rounded-lg"/>
          <input type="email" placeholder="Your Email" required className="p-3 border rounded-lg"/>
          <textarea placeholder="Your Message" required className="p-3 border rounded-lg h-32"/>
          <button type="submit" className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition">
            Send
          </button>
        </form>
      ) : (
        <div className="text-green-600 mt-4">Thank you! Your message has been sent.</div>
      )}
    </main>
  );
}
