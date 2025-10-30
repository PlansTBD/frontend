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
  const lsCity = localStorage.getItem("tbd_city") || "New York";
  setCity(lsCity);

  fetch(`/api/home?city=${encodeURIComponent(lsCity)}`, { cache: "no-store" })
    .then((r) => r.json())
    .then((json) => {
      // Oggi = prima sezione
      setToday(json.sections?.[0]?.items ?? []);
      // Settimana = seconda sezione
      setWeek(json.sections?.[1]?.items ?? []);
      // Top Places = terza sezione
      setPlaces(json.sections?.[2]?.items ?? []);
    })
    .finally(() => setLoading(false));
}, []);

  const LoadingPlaceholder = (
    <div className="flex w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-48 w-[20vw] min-w-[90%] rounded-xl bg-white/5 animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#020617] to-black text-gray-100 font-sans overflow-hidden relative">
      <Hero />

      <Section title={`Happening Today in ${city}`}>
        {loading ? (
          LoadingPlaceholder
        ) : (
          today.map((item, i) => (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Card
                title={item.title}
                desc={item.venue ? `${item.venue} — ${item.price || "N/A"}` : item.category}
                img={item.image || "https://i.pinimg.com/736x/1c/f3/d4/1cf3d4d89ff6f54d0f00bb07d90c4bea.jpg"}
                link={item.url}
              />

            </motion.div>
          ))
        )}
      </Section>

      <Section title="This Week">
        {loading ? (
          LoadingPlaceholder
        ) : (
          week.map((item, i) => (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Card
                title={item.title}
                desc={item.venue ? `${item.venue} — ${item.price || "N/A"}` : item.category}
                img={item.image || "https://i.pinimg.com/736x/1c/f3/d4/1cf3d4d89ff6f54d0f00bb07d90c4bea.jpg"}
                link={item.url}
              />
            </motion.div>
          ))
        )}
      </Section>

      <Section title="Top Places">
        {loading ? LoadingPlaceholder : <TwoColumnSection title="" cards={places} />}
      </Section>
    </main>
  );
}

