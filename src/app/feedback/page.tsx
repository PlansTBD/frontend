"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-white text-black min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl font-bold mb-6">Feedback</h1>
      <p className="mb-8 text-gray-700 text-center max-w-xl">
        Share your thoughts or report bugs. Your feedback helps us improve.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
          <input type="text" placeholder="Your Name (optional)" className="p-3 border rounded-lg"/>
          <textarea placeholder="Your Feedback" required className="p-3 border rounded-lg h-32"/>
          <button type="submit" className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition">
            Submit
          </button>
        </form>
      ) : (
        <div className="text-green-600 mt-4">Thank you for your feedback!</div>
      )}
    </main>
  );
}
