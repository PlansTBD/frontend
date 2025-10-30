export function Card({ title, desc, img, link }: { title?: string; desc?: string; img?: string, link?:string }) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer w-64 h-80 md:w-auto md:h-[420px] flex-shrink-0">
      {/* Background image */}
      <img
        src={img || "/images/fallback.jpg"}
        alt={title || "Event"}
        className="absolute inset-0 w-full h-full object-cover transition duration-500"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition" />

      {/* Content */}
      <div className="absolute bottom-0 p-4 md:p-6 text-white">
        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 drop-shadow">
          {title}
        </h3>
        <p className="text-xs md:text-sm opacity-90 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

// Uso: scroll orizzontale su mobile
export function CardGallery({ cards }: { cards: { title: string; desc: string; img: string }[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-2 md:flex-wrap md:overflow-x-visible">
      {cards.map((card, idx) => (
        <Card key={idx} title={card.title} desc={card.desc} img={card.img} />
      ))}
    </div>
  );
}
