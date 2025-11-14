'use client';

interface Props {
  count: number;
}

export default function AircraftCounter({ count }: Props) {
  return (
    <div className="absolute bottom-4 left-4 z-[1000]">
      <div className="bg-white px-4 py-2 rounded-full shadow-lg">
        <p className="text-sm font-medium text-gray-700">
          Active Aircraft:{' '}
          <span className="font-bold text-blue-600">{count}</span>
        </p>
      </div>
    </div>
  );
}

