'use client';

type Status = 'connected' | 'connecting' | 'disconnected' | 'error';

interface Props {
  status: Status;
}

export default function ConnectionStatus({ status }: Props) {
  const config = {
    connected: {
      color: 'bg-green-500',
      text: 'Connected',
      pulse: true,
    },
    connecting: {
      color: 'bg-yellow-500',
      text: 'Connecting...',
      pulse: true,
    },
    disconnected: {
      color: 'bg-gray-500',
      text: 'Disconnected',
      pulse: false,
    },
    error: {
      color: 'bg-red-500',
      text: 'Connection Error',
      pulse: false,
    },
  };

  const { color, text, pulse } = config[status];

  return (
    <div className="absolute top-4 left-4 z-[1000]">
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
        <span
          className={`w-3 h-3 rounded-full ${color} ${
            pulse ? 'animate-pulse' : ''
          }`}
        />
        <span className="text-sm font-medium text-gray-700">{text}</span>
      </div>
    </div>
  );
}

