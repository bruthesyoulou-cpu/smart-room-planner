import { useAppStore } from '../store/useAppStore';
import {
  ROOM_STATUS_LABEL, ROOM_STATUS_COLOR, ROOM_TYPE_LABEL,
} from '@srp/types';

export default function RoomDetail() {
  const { selectedRoom, setSelectedRoom, rooms, setRoomStatus } = useAppStore();

  if (!selectedRoom) return null;

  const room = rooms.find(r => r.id === selectedRoom.id);
  if (!room) return null;

  const color = ROOM_STATUS_COLOR[room.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedRoom(null)}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color }}>Chambre {room.number}</h2>
          <button onClick={() => setSelectedRoom(null)} className="btn btn-ghost text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <DetailItem label="Étage" value={String(room.floor)} />
          <DetailItem label="Type" value={ROOM_TYPE_LABEL[room.type]} />
          <DetailItem label="Capacité" value={`${room.capacity} pers.`} />
          <DetailItem label="Statut" value={ROOM_STATUS_LABEL[room.status]} color={color} />
          <DetailItem label="Prix/nuit" value={`${room.pricePerNight.toLocaleString('fr')} FCFA`} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 mb-2">Actions</p>
          <div className="flex flex-wrap gap-2">
            {(room.status === 'available' || room.status === 'ready') && (
              <button onClick={() => setRoomStatus(room.id, 'occupied')} className="btn btn-success">✅ Check-in</button>
            )}
            {room.status === 'occupied' && (
              <button onClick={() => setRoomStatus(room.id, 'dirty')} className="btn btn-danger">🏃 Check-out</button>
            )}
            {room.status === 'dirty' && (
              <button onClick={() => setRoomStatus(room.id, 'cleaning')} className="btn btn-primary">🧹 Nettoyer</button>
            )}
            {room.status === 'cleaning' && (
              <button onClick={() => setRoomStatus(room.id, 'ready')} className="btn btn-success">✓ Marquer prête</button>
            )}
            {room.status === 'out_of_service' && (
              <button onClick={() => setRoomStatus(room.id, 'available')} className="btn btn-ghost">🔓 Réactiver</button>
            )}
            <button onClick={() => setRoomStatus(room.id, 'out_of_service')} className="btn btn-ghost text-sm">🚫 Hors service</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium" style={{ color }}>{value}</p>
    </div>
  );
}