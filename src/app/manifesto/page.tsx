"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ManifestoPage() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            Our <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">Manifesto</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-lg md:text-xl text-gray-700 mb-8"
          >
            We believe authentic experiences can transform people.  
            Our mission is to connect communities, emotions, and culture through unique moments.
          </motion.p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800"
            >
              Explore
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer px-6 py-3 rounded-full border border-black font-medium hover:bg-black hover:text-white"
            >
              Learn More
            </motion.button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-0"
        >
          <Image
            src="/img/abstract-1.jpg"
            alt="Abstract Shape"
            width={500}
            height={500}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-gray-100 to-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              To give everyone the chance to discover and live unforgettable experiences,  
              making culture, creativity, and entertainment accessible to all.
            </p>
            <button className="cursor-pointer px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800">
              Read Mission
            </button>
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/img/abstract-2.jpg"
              alt="Mission Visual"
              width={600}
              height={400}
              className="rounded-3xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/img/abstract-3.jpg"
              alt="Vision Visual"
              width={600}
              height={400}
              className="rounded-3xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Vision</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              To build a world where people don’t just search for events,  
              but find connections, inspiration, and new perspectives on life.
            </p>
            <button className=" cursor-pointer px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200">
              Read Vision
            </button>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white rounded-t-[6rem]" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {["Authenticity", "Inclusivity", "Innovation"].map((val, i) => (
              <motion.div
                key={val}
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{val}</h3>
                <p className="text-gray-700">
                  {i === 0 &&
                    "Real experiences, curated by real people, designed to move without filters."}
                  {i === 1 &&
                    "Everyone is welcome: we break barriers and build cultural bridges."}
                  {i === 2 &&
                    "Technology and creativity meet to redesign how we live free time."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
