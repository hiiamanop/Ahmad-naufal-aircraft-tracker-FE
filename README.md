# Aircraft Tracker Frontend

Real-time aircraft tracking web application built with Next.js 14. Displays live aircraft positions on an interactive map with real-time updates via WebSocket.

## Features

- 🗺️ Interactive map with live aircraft positions
- ✈️ Rotating aircraft markers based on heading direction
- 📊 Real-time position updates via WebSocket
- 📱 Responsive design (mobile, tablet, desktop)
- 🔌 Auto-reconnect on connection loss
- 🎨 Clean, modern UI with Tailwind CSS
- 📋 Aircraft detail panel with key information

## Tech Stack

- **Next.js 14** (App Router) - React framework with SSR capabilities
- **React 18** - UI library
- **Leaflet / React-Leaflet** - Map rendering library
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **WebSocket** - Real-time bidirectional communication

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

NEXT_PUBLIC_MAP_CENTER_LAT=-37.8136
NEXT_PUBLIC_MAP_CENTER_LNG=144.9631
NEXT_PUBLIC_MAP_ZOOM=8
```

3. Run development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── Map/               # Map components
│   │   ├── Map.tsx        # Main map container
│   │   └── AircraftMarker.tsx  # Aircraft marker with rotation
│   ├── AircraftInfo/       # Aircraft detail panel
│   │   └── InfoPanel.tsx  # Detail panel component
│   └── UI/                # UI components
│       ├── ConnectionStatus.tsx
│       ├── AircraftCounter.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorDisplay.tsx
├── hooks/
│   └── useWebSocket.ts    # WebSocket connection hook
├── store/
│   └── aircraftStore.ts   # Zustand state management
└── constants/
    └── config.ts          # Configuration constants
```

## Design Decisions

### Framework: Next.js 14

Next.js 14 was chosen for its excellent developer experience, built-in optimizations, and App Router architecture. It provides:
- Server-side rendering capabilities
- Automatic code splitting
- Optimized production builds
- Excellent TypeScript support

### Map Library: React-Leaflet

React-Leaflet was selected over alternatives (Mapbox, Google Maps) because:
- **Lightweight**: No API keys required
- **Open-source**: Free to use without restrictions
- **Good performance**: Handles many markers efficiently
- **Mobile-friendly**: Works well on touch devices
- **Customizable**: Easy to create custom markers and overlays

### State Management: Zustand

Zustand was chosen over Redux because:
- **Minimal boilerplate**: Simple API, less code
- **TypeScript-friendly**: Excellent type inference
- **Performance**: Lightweight and fast
- **Easy to learn**: Straightforward API

### Real-time Communication: WebSocket

WebSocket was chosen for real-time updates because:
- **Low latency**: Direct connection, no polling overhead
- **Bidirectional**: Server can push updates immediately
- **Efficient**: Only sends data when changes occur
- **Auto-reconnect**: Built-in reconnection logic handles network issues

### Styling: Tailwind CSS

Tailwind CSS was chosen for:
- **Rapid development**: Utility classes speed up styling
- **Consistency**: Design system ensures uniform look
- **Small bundle**: Only used classes are included
- **Responsive**: Built-in responsive utilities

## API Integration

The frontend connects to the backend via:

1. **REST API** (initial load):
   - `GET /api/aircraft` - Fetch all current aircraft

2. **WebSocket** (real-time updates):
   - Connects to `ws://localhost:3001`
   - Receives `aircraft_update` events
   - Auto-reconnects on disconnect

## Performance Optimizations

- **Dynamic imports**: Map components loaded client-side only (avoids SSR issues)
- **Efficient updates**: Only changed aircraft trigger re-renders
- **Memoization**: Components memoized to prevent unnecessary renders
- **Code splitting**: Next.js automatically splits code by route
- **Optimized markers**: Custom SVG icons instead of images

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Known Limitations

- Real-time updates depend on backend WebSocket connection
- Map performance may degrade with 1000+ simultaneous aircraft
- Mobile browsers may have limited WebGL support for advanced features

## Troubleshooting

### Map doesn't display

- Check browser console for errors
- Ensure Leaflet CSS is loaded (check `layout.tsx`)
- Verify no SSR errors (map must be client-side only)

### WebSocket not connecting

- Verify backend is running on port 3001
- Check `NEXT_PUBLIC_WS_URL` in `.env.local`
- Check browser console for connection errors
- Verify CORS is configured on backend

### Aircraft markers not updating

- Check WebSocket connection status indicator
- Verify backend is broadcasting updates
- Check browser DevTools Network tab (WS filter)

## License

MIT
