"use client";

export default function ExperienceSidebar({ experiences, onSelect }: any) {
  return (
    <div
      className="absolute top-4 bottom-4 left-4 h-[95vh] w-[350px] hidden md:flex flex-col rounded-xl
                 backdrop-blur-2xl bg-gradient-to-b from-black/60 to-black/40
                 border border-white/10 z-10
                 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1),0_8px_32px_0_rgba(0,0,0,0.6)]"
    >
      <div className="p-5 border-b border-white/10 ml-auto text-right">
        <h2 className="text-lg font-semibold text-white drop-shadow">
          Experiences
        </h2>
        <p className="text-xs text-gray-300">Explore curated adventures</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20">
        {experiences.map((exp: any) => (
          <div
            key={exp.id}
            onClick={() => onSelect(exp)}
            className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer
                       bg-white/10 hover:bg-white/20 transition-all duration-200
                       border border-white/10 hover:border-white/20"
          >
            <img
              src={exp.img}
              alt={exp.title}
              className="w-16 h-16 rounded-lg object-cover shadow-md 
                         aspect-square 
                         group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-white text-sm group-hover:text-gray-200">
                {exp.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 flex justify-between backdrop-blur-md bg-black/40">
        <button className="px-4 py-2 rounded-full bg-white/90 text-black text-sm font-semibold hover:bg-white transition shadow-md">
          Add
        </button>
        <button className="px-4 py-2 rounded-full cursor-pointer bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition">
          Settings
        </button>
      </div>
    </div>
  );
}
