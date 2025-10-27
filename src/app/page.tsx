"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Section } from "@/components/home/Section";
import { Card } from "@/components/home/Card";
import  Hero  from "@/components/home/Hero";
import { TwoColumnSection } from "@/components/home/TwoColumnSection";

const phrases = [
  "Oggi sei in o out?",
  "Are you in or out today?",
  "Aujourd’hui, tu es in ou out ?",
  "Bist du heute in oder out?",
  "Hoy, ¿estás in o out?"
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#020617] to-black text-gray-100 font-sans overflow-hidden relative">
      {/* Animated glowing background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(0,180,255,0.3), transparent 60%)",
              "radial-gradient(circle at 80% 60%, rgba(0,120,255,0.3), transparent 60%)",
              "radial-gradient(circle at 50% 80%, rgba(0,220,255,0.4), transparent 60%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute inset-0 blur-3xl opacity-60"
        />
      </div>

      <Hero />

      <Section title="Experiences that matter around the world">
        {[
          { title: "Concerto in Darsena", desc: "Musica live sul Naviglio", img: "https://i.pinimg.com/736x/49/28/2e/49282e9386261c7a760dfc87fe1ea6e5.jpg" },
          { title: "Aperitivo in Brera", desc: "Scopri i migliori cocktail bar", img: "https://i.pinimg.com/1200x/ab/6b/42/ab6b425dc05f084c230019a324ed4b1b.jpg" },
          { title: "Cinema sotto le stelle", desc: "Film all'aperto a Parco Sempione", img: "https://i.pinimg.com/1200x/c4/ec/55/c4ec5509aeb9d41e4a3540ca1ee14d61.jpg" },
          { title: "Festival della birra", desc: "Degustazioni e musica", img: "https://i.pinimg.com/736x/68/8b/66/688b667d95117eaacefd863e3be9333d.jpg" },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Card {...c} />
          </motion.div>
        ))}
      </Section>

      <TwoColumnSection
        title="Your adventures, our suggestions"
        cards={[
          {
            img: "https://i.pinimg.com/736x/49/28/2e/49282e9386261c7a760dfc87fe1ea6e5.jpg",
            title: "Concerto in Darsena",
            desc: "Musica live sul Naviglio",
            tags: ["Musica", "Live", "Estate"]
          },
          {
            img: "https://i.pinimg.com/1200x/ab/6b/42/ab6b425dc05f084c230019a324ed4b1b.jpg",
            title: "Aperitivo in Brera",
            desc: "Scopri i migliori cocktail bar",
            tags: ["Drink", "Cocktail", "Brera"]
          },
          {
            img: "https://i.pinimg.com/1200x/c4/ec/55/c4ec5509aeb9d41e4a3540ca1ee14d61.jpg",
            title: "Cinema sotto le stelle",
            desc: "Film all'aperto a Parco Sempione",
            tags: ["Cinema", "Outdoor", "Estate"]
          },
          {
            img: "https://i.pinimg.com/736x/68/8b/66/688b667d95117eaacefd863e3be9333d.jpg",
            title: "Mostra d'arte contemporanea",
            desc: "Esposizione in centro",
            tags: ["Arte", "Mostra", "Cultura"]
          }
        ]}
      />
    </main>
  );
}


