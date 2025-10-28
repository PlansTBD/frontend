"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/home/Section";
import { Card } from "@/components/home/Card";
import Hero from "@/components/home/Hero";
import { TwoColumnSection } from "@/components/home/TwoColumnSection";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState<any[]>([]);
  const [week, setWeek] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [city, setCity] = useState("Milan");

useEffect(() => {
  const lsCity = localStorage.getItem("tbd_city") || "Milan";
  setCity(lsCity);

  fetch(`/api/home?city=${encodeURIComponent(lsCity)}`, { cache: "no-store" })
    .then((r) => {
      if (!r.ok) throw new Error("Failed /api/home");
      return r.json();
    })
    .then((json) => {
      // ✅ estrai solo gli items interni
      const eventsToday = json.sections?.venues?.[0]?.items ?? [];
      const eventsWeek = json.sections?.restaurants?.[0]?.items ?? [];
      const topPlaces = json.sections?.bars ?? [];

      setToday(eventsToday);
      setWeek(eventsWeek);
      setPlaces(topPlaces);
    })
    .catch((err) => {
      console.error(err);
      setToday([]);
      setWeek([]);
      setPlaces([]);
    })
    .finally(() => setLoading(false));
}, []);


  const shimmer = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#020617] to-black text-gray-100 font-sans overflow-hidden relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(0,180,255,0.3), transparent 60%)",
              "radial-gradient(circle at 80% 60%, rgba(0,120,255,0.3), transparent 60%)",
              "radial-gradient(circle at 50% 80%, rgba(0,220,255,0.4), transparent 60%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 blur-3xl opacity-60"
        />
      </div>

      <Hero />

      <Section title={`Happening Today in ${city}`}>
        {loading
          ? shimmer
          : today.map((item, i) => (
              <motion.div
                key={item.id ?? i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <Card
                  title={item.name}
                  desc={item.description}
                  img={"https://i.pinimg.com/736x/96/87/c6/9687c6a544d612a390aff99126d7c840.jpg"}
                />
              </motion.div>
            ))}
      </Section>


      <Section title="This Week">
       {loading
        ? shimmer
        : week.map((item, i) => (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Card
                title={item.name}
                desc={item.description}
                img={"https://i.pinimg.com/736x/96/87/c6/9687c6a544d612a390aff99126d7c840.jpg"}
              />
            </motion.div>
          ))}
      </Section>

      <TwoColumnSection title="Top Places" cards={places} />
    </main>
  );
}
