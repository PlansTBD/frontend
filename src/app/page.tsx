"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/home/Section";
import { Card } from "@/components/home/Card";
import Hero from "@/components/home/Hero";
import { TwoColumnSection } from "@/components/home/TwoColumnSection";

export default function HomePage({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(!initialData);
  const [today, setToday] = useState(initialData?.sections?.venues?.[0]?.items ?? []);
  const [week, setWeek] = useState(initialData?.sections?.restaurants?.[0]?.items ?? []);
  const [places, setPlaces] = useState(initialData?.sections?.bars ?? []);
  const [city, setCity] = useState("Milan");

  useEffect(() => {
    if (initialData) return;
    const lsCity = localStorage.getItem("tbd_city") || "Milan";
    setCity(lsCity);
    fetch(`/api/home?city=${encodeURIComponent(lsCity)}`, { next: { revalidate: 60 } })
      .then((r) => r.json())
      .then((json) => {
        setToday(json.sections?.venues?.[0]?.items ?? []);
        setWeek(json.sections?.restaurants?.[0]?.items ?? []);
        setPlaces(json.sections?.bars ?? []);
      })
      .finally(() => setLoading(false));
  }, [initialData]);

  // 🔹 Semplice placeholder di caricamento (riutilizzabile)
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

      {/* 🔸 Section: Today */}
      <Section title={`Happening Today in ${city}`}>
        {loading ? (
          LoadingPlaceholder
        ) : (
          today.map((item: any, i: number) => (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Card
                title={item.name}
                desc={item.description}
                img={"https://i.pinimg.com/736x/1c/f3/d4/1cf3d4d89ff6f54d0f00bb07d90c4bea.jpg"}
              />
            </motion.div>
          ))
        )}
      </Section>

      {/* 🔸 Section: This Week */}
      <Section title="This Week">
        {loading ? (
          LoadingPlaceholder
        ) : (
          week.map((item: any, i: number) => (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Card
                title={item.name}
                desc={item.description}
                img={"https://i.pinimg.com/736x/1c/f3/d4/1cf3d4d89ff6f54d0f00bb07d90c4bea.jpg"}
              />
            </motion.div>
          ))
        )}
      </Section>

      {/* 🔸 Section: Top Places */}
      <Section title="Top Places">
        {loading ? (
          LoadingPlaceholder
        ) : (
          <TwoColumnSection title="" cards={places} />
        )}
      </Section>
    </main>
  );
}
