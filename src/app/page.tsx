'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAircraftStore } from '@/store/aircraftStore';
import ConnectionStatus from '@/components/UI/ConnectionStatus';
import AircraftCounter from '@/components/UI/AircraftCounter';
import AircraftInfoPanel from '@/components/AircraftInfo/InfoPanel';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import ErrorDisplay from '@/components/UI/ErrorDisplay';

// Dynamic import to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  useWebSocket();

  const {
    aircraft,
    selectedAircraft,
    connectionStatus,
    loading,
    error,
    selectAircraft,
    setAircraft,
    setLoading,
    setError,
  } = useAircraftStore();

  // Fetch initial data
  useEffect(() => {
    async function fetchInitialData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/aircraft`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setAircraft(result.data || []);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load aircraft data'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [setAircraft, setLoading, setError]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Connection Status */}
      <ConnectionStatus status={connectionStatus} />

      {/* Map */}
      <Map />

      {/* Aircraft Info Panel */}
      {selectedAircraft && (
        <AircraftInfoPanel
          aircraft={selectedAircraft}
          onClose={() => selectAircraft(null)}
        />
      )}

      {/* Aircraft Counter */}
      <AircraftCounter count={aircraft.length} />
    </main>
  );
}

