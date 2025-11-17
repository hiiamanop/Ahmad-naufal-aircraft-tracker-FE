'use client';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useAircraftStore } from '@/store/aircraftStore';
import AircraftMarker from './AircraftMarker';

const MAP_CENTER_LAT = parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT || '-37.8136');
const MAP_CENTER_LNG = parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG || '144.9631');
const MAP_ZOOM = parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM || '8', 10);

export default function Map() {
  const aircraft = useAircraftStore((state) => state.aircraft);

  return (
    <MapContainer
      center={[MAP_CENTER_LAT, MAP_CENTER_LNG]}
      zoom={MAP_ZOOM}
      style={{ height: '100vh', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />

      {aircraft.map((plane) => (
        <AircraftMarker key={plane.callsign} aircraft={plane} />
      ))}
    </MapContainer>
  );
}

