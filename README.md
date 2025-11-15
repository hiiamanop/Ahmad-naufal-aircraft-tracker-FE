# Aircraft Tracker Frontend

Real-time aircraft tracking web application built with Next.js 14. Displays live aircraft positions on an interactive map with real-time updates via WebSocket.

## 🚀 Live Deployment

- **Production URL:** http://103.193.179.213:3004
- **GitHub Repository:** https://github.com/hiiamanop/Ahmad-naufal-aircraft-tracker-FE.git
- **Backend API:** http://103.193.179.213:3003

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

**Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

NEXT_PUBLIC_MAP_CENTER_LAT=-37.8136
NEXT_PUBLIC_MAP_CENTER_LNG=144.9631
NEXT_PUBLIC_MAP_ZOOM=8
```

**Production:**
```env
NEXT_PUBLIC_API_URL=http://103.193.179.213:3003
NEXT_PUBLIC_WS_URL=ws://103.193.179.213:3003

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

**Note:** For production deployment, ensure the `start` script in `package.json` binds to `0.0.0.0`:

```json
{
  "scripts": {
    "start": "next start -H 0.0.0.0 -p 3004"
  }
}
```

Or use environment variable:
```bash
PORT=3004 HOSTNAME=0.0.0.0 npm start
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
   - Development: Connects to `ws://localhost:3001`
   - Production: Connects to `ws://103.193.179.213:3003`
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

- Verify backend is running (port 3001 for dev, 3003 for production)
- Check `NEXT_PUBLIC_WS_URL` in `.env.local`
- Check browser console for connection errors
- Verify CORS is configured on backend to allow your frontend origin
- For production, ensure firewall allows port 3003 (backend) and 3004 (frontend)

### Aircraft markers not updating

- Check WebSocket connection status indicator
- Verify backend is broadcasting updates
- Check browser DevTools Network tab (WS filter)

## Deployment

### Production Server

The frontend is deployed on a Linux server using PM2 for process management:

- **Server:** 103.193.179.213:2222
- **Port:** 3004
- **Process Manager:** PM2
- **Status:** Running and accessible at http://103.193.179.213:3004

### Deployment Commands

```bash
# Build for production
npm run build

# Start with PM2 (using ecosystem config or environment variables)
PORT=3004 HOSTNAME=0.0.0.0 pm2 start npm --name aircraft-tracker-frontend -- start

# Or use ecosystem.config.js
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# View logs
pm2 logs aircraft-tracker-frontend

# Restart
pm2 restart aircraft-tracker-frontend
```

### PM2 Ecosystem Config Example

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'aircraft-tracker-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/aircraft-tracker/frontend',
    env: {
      PORT: 3004,
      HOSTNAME: '0.0.0.0',
      NODE_ENV: 'production'
    }
  }]
};
```

**Important:** Ensure the frontend binds to `0.0.0.0` (not just `localhost`) to be accessible from outside the server.

## License

MIT
