import { useAppStore } from '../store/useAppStore';
import RoomCard from './RoomCard';

export default function RoomGrid() {
  const viewMode = useAppStore(s => s.viewMode);
  const filteredRooms = useAppStore(s => s.filteredRooms);
  const rooms = filteredRooms();

  if (rooms.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        <p>Aucune chambre trouvée.</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-2">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}