"use client";

import { useState, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Menu, X } from "lucide-react"; 

import ExperienceSidebar from "@/components/experiences/ExperienceSidebar";
import ExperienceFilters from "@/components/experiences/ExperienceFilters";
import ExperiencePopup from "@/components/experiences/ExperiencePopup";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Funzione per determinare lo stile della mappa in base all'orario
function getMapStyleByTime() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return "mapbox://styles/loriscaputo/cmh3n3rzb007b01qt30he7j2f"; // dawn
  if (hour >= 8 && hour < 17) return "mapbox://styles/mapbox/standard"; // day
  if (hour >= 17 && hour < 20) return "mapbox://styles/loriscaputo/cmh3n45ln00a301qx1zux6ly9"; // dusky
  return "mapbox://styles/loriscaputo/cmh3n3dr6001i01s9b0av2j2a"; // night
}

const dummyExperiences = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Experience ${i + 1}`,
  desc: "A unique adventure awaits. Lorem ipsum dolor sit amet consectetur.",
  img: "https://i.pinimg.com/736x/49/28/2e/49282e9386261c7a760dfc87fe1ea6e5.jpg",
  lat: 45.4642 + Math.random() * 0.01,
  lng: 9.19 + Math.random() * 0.01,
  category: i % 2 === 0 ? "Music" : "Food",
  price: Math.floor(Math.random() * 200) + 50,
}));

export default function MapExperiencePage() {
  const [selected, setSelected] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [viewport, setViewport] = useState({
    latitude: 45.4642,
    longitude: 9.19,
    zoom: 13,
  });
  const [mapStyle, setMapStyle] = useState(getMapStyleByTime());

  // Aggiorna lo stile ogni 10 minuti
  useEffect(() => {
    const interval = setInterval(() => {
      setMapStyle(getMapStyleByTime());
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Bottone apertura/chiusura sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-8 left-8 z-30 p-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/10 shadow-lg text-black transition-transform hover:scale-105"
        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Filtro in alto */}
      <div className="fixed z-30 p-3 rounded-full text-black top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[50%]">
        <ExperienceFilters />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-[350px] max-w-full bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-[350px] ${
          isSidebarOpen ? "md:block" : "md:hidden"
        }`}
      >
        <div className={`h-full ${isSidebarOpen ? "block" : "hidden"} md:block transition-all duration-300 ease-in-out`}>
          <ExperienceSidebar experiences={dummyExperiences} onSelect={setSelected} />
        </div>
      </div>
      
      {/* Mappa */}
      <div className="absolute inset-0 transition-all duration-300 ease-in-out">
        <Map
          initialViewState={viewport}
          mapStyle={mapStyle}
          mapboxAccessToken={MAPBOX_TOKEN}
          onMove={(evt: any) => setViewport(evt.viewState)}
        >
          {dummyExperiences.map((exp) => (
            <Marker
              key={exp.id}
              latitude={exp.lat}
              longitude={exp.lng}
              onClick={() => setSelected(exp)}
            >
              <div className="w-4 h-4 bg-white rounded-full border-2 border-black cursor-pointer hover:scale-125 transition" />
            </Marker>
          ))}

          {selected && (
            <Popup
              latitude={selected.lat}
              longitude={selected.lng}
              onClose={() => setSelected(null)}
              closeButton={false}
              offset={25}
              anchor="bottom"
            >
              <ExperiencePopup experience={selected} />
            </Popup>
          )}

          <NavigationControl position="bottom-right" />
        </Map>
      </div>

      {/* Overlay scuro mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
