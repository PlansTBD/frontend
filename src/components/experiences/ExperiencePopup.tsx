"use client";

import { useRouter } from "next/navigation";

export default function ExperiencePopup({ experience }: any) {
  const router = useRouter();

  return (
    <div className="w-60 bg-black/80 text-white p-3 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
      <img
        src={experience.img}
        alt={experience.title}
        className="w-full h-24 rounded-lg object-cover mb-2"
      />
      <h3 className="font-semibold text-sm">{experience.title}</h3>
      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{experience.desc}</p>
      <button
        onClick={() => router.push(`/experiences/${experience.id}`)}
        className="mt-3 w-full bg-white text-black py-1.5 text-sm rounded-full hover:bg-gray-200 transition"
      >
        View details
      </button>
    </div>
  );
}
