"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ExperienceFilters() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const filters = [
    { name: "Category", options: ["Music", "Food", "Nature", "Art"] },
    { name: "Price", options: ["$", "$$", "$$$"] },
    { name: "Distance", options: ["< 5 km", "< 10 km", "< 20 km"] },
  ];

  return (
    <div className="flex flex-wrap z-100 items-center justify-center gap-3 px-4 py-3 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-lg">
      {filters.map((filter) => (
        <div key={filter.name} className="relative">
          <button
            onClick={() =>
              setOpenFilter(openFilter === filter.name ? null : filter.name)
            }
            className="cursor-pointer flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition"
          >
            {filter.name}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openFilter === filter.name ? "rotate-180" : ""
              }`}
            />
          </button>

          {openFilter === filter.name && (
            <div className="absolute cursor-pointer z-30 top-12 left-0 w-40 bg-white/90 border border-white/10 rounded-xl shadow-lg backdrop-blur-xl">
              {filter.options.map((opt) => (
                <button
                  key={opt}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
