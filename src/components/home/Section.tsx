import { ChevronRight } from "lucide-react";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="w-[80vw] mx-auto mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        {/*<button className="flex items-center gap-1 text-gray-600 hover:text-black transition font-medium">
          What's next <ChevronRight className="w-5 h-5" />
        </button> */}
      </div>

      {/* Container responsivo */}
<div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ overflowY: "hidden"}}>
        {children}
      </div>
    </section>
  );
}
