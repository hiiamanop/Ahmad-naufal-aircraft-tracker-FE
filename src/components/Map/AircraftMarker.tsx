'use client';

import { Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useAircraftStore } from '@/store/aircraftStore';
import { Aircraft } from '@/store/aircraftStore';

interface Props {
  aircraft: Aircraft;
}

export default function AircraftMarker({ aircraft }: Props) {
  const selectAircraft = useAircraftStore((state) => state.selectAircraft);
  const selectedAircraft = useAircraftStore((state) => state.selectedAircraft);
  const isSelected = selectedAircraft?.callsign === aircraft.callsign;

  // Determine color based on vertical rate
  const getColor = () => {
    if (!aircraft.vertical_rate) return '#3b82f6'; // blue
    if (aircraft.vertical_rate > 100) return '#22c55e'; // green (climbing)
    if (aircraft.vertical_rate < -100) return '#ef4444'; // red (descending)
    return '#3b82f6'; // blue (level)
  };

  const color = getColor();

  // Create custom aircraft icon
  const createAircraftIcon = () => {
    // Make selected aircraft larger and add border
    const size = isSelected ? 36 : 30;
    const strokeWidth = isSelected ? 2.5 : 1.5;
    const borderColor = isSelected ? '#fbbf24' : 'white'; // Yellow border when selected
    
    const iconMarkup = renderToStaticMarkup(
      <div
        style={{
          transform: `rotate(${aircraft.heading}deg)`,
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: isSelected ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))' : 'none',
        }}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 L16 12 L12 10 L8 12 Z"
            fill={color}
            stroke={borderColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>
    );

    return divIcon({
      html: iconMarkup,
      className: 'aircraft-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const handleMarkerClick = (e: any) => {
    e.originalEvent?.stopPropagation();
    console.log('Aircraft marker clicked:', aircraft.callsign);
    selectAircraft(aircraft.callsign);
  };

  // Recreate icon when selection changes
  const icon = createAircraftIcon();

  return (
    <Marker
      key={`${aircraft.callsign}-${isSelected ? 'selected' : 'normal'}`}
      position={[aircraft.latitude, aircraft.longitude]}
      icon={icon}
      eventHandlers={{
        click: handleMarkerClick,
      }}
      interactive={true}
      bubblingMouseEvents={false}
    >
      <Tooltip direction="top" offset={[0, -15]} permanent>
        <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
          {aircraft.callsign}
        </span>
      </Tooltip>
    </Marker>
  );
}

