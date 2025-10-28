"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface DummyCard {
  id: number;
  title: string;
  desc: string;
  lat: number;
  lng: number;
}

interface Props {
  cards: DummyCard[];
}

export default function MapClient({ cards }: Props) {
  const [mounted, setMounted] = useState(false);

  // Assicura rendering solo lato client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <MapContainer
      center={[45.4642, 9.19]}
      zoom={13}
      scrollWheelZoom
      className="w-full h-full rounded-3xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cards.map((card) => (
        <Marker key={card.id} position={[card.lat, card.lng]}>
          <Popup>
            <strong>{card.title}</strong>
            <p>{card.desc}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
