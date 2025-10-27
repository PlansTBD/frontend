"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface CardWithTagsProps {
  img: string;
  title: string;
  desc: string;
  tags: string[];
}

export function CardWithTags({ img, title, desc, tags }: CardWithTagsProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3 }}
      className="group relative flex items-center gap-4 rounded-2xl bg-white/5 backdrop-blur-lg 
                 hover:bg-white/10 transition-all duration-300 p-4 border border-white/10"
    >
      {/* Immagine a sinistra */}
      <div className="relative flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Testo a destra */}
      <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{desc}</p>

        {/* Tag */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-[3px] rounded-full text-xs font-medium text-gray-200 
                         bg-white/10 hover:bg-white/20 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
