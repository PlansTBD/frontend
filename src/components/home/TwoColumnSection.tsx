"use client";

import { motion } from "framer-motion";
import { CardWithTags, CardWithTagsProps } from "./CardWithTags";

interface TwoColumnSectionProps {
  title: string;
  cards: CardWithTagsProps[];
}

export function TwoColumnSection({ title, cards }: TwoColumnSectionProps) {
  const mid = Math.ceil(cards.length / 2);
  const leftColumn = cards.slice(0, mid);
  const rightColumn = cards.slice(mid);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,150,255,0.15),transparent_70%)] blur-3xl"></div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-4">{title}</h2>


      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {leftColumn.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CardWithTags {...card} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {rightColumn.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CardWithTags {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
