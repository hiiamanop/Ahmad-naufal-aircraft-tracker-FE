import 'leaflet/dist/leaflet.css';
import './globals.css';

export const metadata = {
  title: 'Aircraft Tracker',
  description: 'Real-time aircraft tracking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

