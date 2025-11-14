"use client";

import {
  X,
  Plane,
  ArrowUp,
  Gauge,
  Compass,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Aircraft } from "@/store/aircraftStore";

interface Props {
  aircraft: Aircraft | null;
  onClose: () => void;
}

export default function AircraftInfoPanel({ aircraft, onClose }: Props) {
  if (!aircraft) return null;

  return (
    <div className="absolute top-4 right-4 w-80 sm:w-96 bg-white rounded-lg shadow-2xl z-[1000] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Plane className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">
                {aircraft.callsign}
              </h2>
              <p className="text-gray-600 text-sm">Live Flight Data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Data Fields */}
      <div className="p-4 space-y-3">
        {/* Altitude */}
        <DataField
          icon={<ArrowUp className="w-5 h-5" />}
          label="Altitude"
          value={`${aircraft.altitude?.toLocaleString() || "N/A"} ft`}
          iconColor="text-black"
          bgColor="bg-gray-50"
        />

        {/* Speed */}
        <DataField
          icon={<Gauge className="w-5 h-5" />}
          label="Speed"
          value={`${aircraft.speed || "N/A"} kts`}
          iconColor="text-black"
          bgColor="bg-gray-50"
        />

        {/* Heading */}
        <DataField
          icon={<Compass className="w-5 h-5" />}
          label="Heading"
          value={`${aircraft.heading || "N/A"}°`}
          iconColor="text-black"
          bgColor="bg-gray-50"
        />

        {/* Vertical Rate (if available) */}
        {aircraft.vertical_rate !== undefined &&
          aircraft.vertical_rate !== 0 && (
            <DataField
              icon={
                aircraft.vertical_rate > 0 ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )
              }
              label="Vertical Rate"
              value={`${aircraft.vertical_rate > 0 ? "+" : ""}${
                aircraft.vertical_rate
              } ft/min`}
              iconColor="text-black"
              bgColor="bg-gray-50"
            />
          )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Last update:{" "}
          {aircraft.last_updated
            ? new Date(aircraft.last_updated).toLocaleTimeString()
            : "Just now"}
        </p>
      </div>
    </div>
  );
}

interface DataFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconColor: string;
  bgColor: string;
}

function DataField({ icon, label, value, iconColor, bgColor }: DataFieldProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 ${bgColor} rounded-lg transition hover:shadow-md`}
    >
      <div className={`${iconColor} flex-shrink-0`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">
          {label}
        </p>
        <p className="text-lg font-bold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  );
}
