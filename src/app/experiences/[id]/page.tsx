"use client";

import { useRouter } from "next/navigation";

interface ExperienceDetailProps {
  params: { id: string };
}

export default function ExperienceDetail({ params }: ExperienceDetailProps) {
  const router = useRouter();
  const { id } = params;

  // Qui potresti fetchare i dati reali usando id
  const experience = {
    title: `Experience ${id}`,
    desc: "Una descrizione dettagliata dell'esperienza.",
    img: "/img/concert.jpg",
    location: "Milano, Italia",
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      <button onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-black">
        ← Torna indietro
      </button>
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <img src={experience.img} alt={experience.title} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
          <p className="text-gray-700 mb-4">{experience.desc}</p>
          <p className="text-gray-500">📍 {experience.location}</p>
        </div>
      </div>
    </main>
  );
}
