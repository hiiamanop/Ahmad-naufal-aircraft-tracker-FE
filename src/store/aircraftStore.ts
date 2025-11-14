import { create } from 'zustand';

export interface Aircraft {
  callsign: string;
  latitude: number;
  longitude: number;
  altitude: number;
  heading: number;
  speed: number;
  vertical_rate?: number;
  last_updated?: string;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface AircraftStore {
  aircraft: Aircraft[];
  selectedAircraft: Aircraft | null;
  connectionStatus: ConnectionStatus;
  loading: boolean;
  error: string | null;

  // Actions
  setAircraft: (aircraft: Aircraft[]) => void;
  updateAircraft: (updates: Aircraft[]) => void;
  addAircraft: (newAircraft: Aircraft[]) => void;
  removeAircraft: (callsigns: string[]) => void;
  selectAircraft: (callsign: string | null) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAircraftStore = create<AircraftStore>((set) => ({
  aircraft: [],
  selectedAircraft: null,
  connectionStatus: 'disconnected',
  loading: true,
  error: null,

  setAircraft: (aircraft) =>
    set({
      aircraft,
      loading: false,
    }),

  updateAircraft: (updates) =>
    set((state) => {
      const updatedAircraft = [...state.aircraft];

      updates.forEach((update) => {
        const index = updatedAircraft.findIndex(
          (a) => a.callsign === update.callsign
        );

        if (index !== -1) {
          updatedAircraft[index] = {
            ...updatedAircraft[index],
            ...update,
            last_updated: new Date().toISOString(),
          };
        } else {
          updatedAircraft.push({
            ...update,
            last_updated: new Date().toISOString(),
          });
        }
      });

      return {
        aircraft: updatedAircraft,
        selectedAircraft: state.selectedAircraft
          ? updatedAircraft.find(
              (a) => a.callsign === state.selectedAircraft?.callsign
            ) || state.selectedAircraft
          : null,
      };
    }),

  addAircraft: (newAircraft) =>
    set((state) => ({
      aircraft: [...state.aircraft, ...newAircraft],
    })),

  removeAircraft: (callsigns) =>
    set((state) => ({
      aircraft: state.aircraft.filter((a) => !callsigns.includes(a.callsign)),
    })),

  selectAircraft: (callsign) =>
    set((state) => ({
      selectedAircraft: callsign
        ? state.aircraft.find((a) => a.callsign === callsign) || null
        : null,
    })),

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));

