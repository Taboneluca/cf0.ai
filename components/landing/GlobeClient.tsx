"use client";
import dynamic from "next/dynamic";

// Client-only dynamic import of the World component from the globe module
const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export function GlobeClient({ globeConfig, data }: { globeConfig: GlobeConfig; data: Position[] }) {
  return <World globeConfig={globeConfig} data={data} />;
}


