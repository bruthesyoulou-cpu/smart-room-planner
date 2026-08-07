import type { Room, RoomStatus } from '@srp/types';
import {
  ROOM_STATUS_LABEL, ROOM_STATUS_COLOR, ROOM_STATUS_ICON, ROOM_TYPE_LABEL,
} from '@srp/types';
import { useAppStore } from '../store/useAppStore';
import { STATUS_CARD_CLASS } from '../data/mock';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const setSelectedRoom = useAppStore(s => s.setSelectedRoom);
  const setRoomStatus = useAppStore(s => s.setRoomStatus);
  const color = ROOM_STATUS_COLOR[room.status];
  const icon = ROOM_STATUS_ICON[room.status];
  const label = ROOM_STATUS_LABEL[room.status];

  const canCheckIn = room.status === 'available' || room.status === 'ready';
  const canCheckOut = room.status === 'occupied';
  const canMarkDirty = room.status === 'cleaning';
  const canStartCleaning = room.status === 'dirty';

  return (
    <div
      className={`${STATUS_CARD_CLASS[room.status]} p-4 flex flex-col gap-3 min-w-[200px]`}
      onClick={() => setSelectedRoom(room)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold" style={{ color }}>{room.number}</p>
          <p className="text-xs text-gray-400">Étage {room.floor} · {ROOM_TYPE_LABEL[room.type]}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Status */}
      <span className="badge" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
        {label}
      </span>

      {/* Price */}
      <p className="text-xs text-gray-500">{room.pricePerNight.toLocaleString('fr')} F/nuit</p>

      {/* Quick actions */}
      <div className="flex gap-1.5 mt-auto pt-2 border-t border-gray-700/50">
        {canCheckIn && (
          <button onClick={e => { e.stopPropagation(); setRoomStatus(room.id, 'occupied'); }}
            className="btn btn-success text-xs py-1 px-2">Check-in</button>
        )}
        {canCheckOut && (
          <button onClick={e => { e.stopPropagation(); setRoomStatus(room.id, 'dirty'); }}
            className="btn btn-danger text-xs py-1 px-2">Check-out</button>
        )}
        {canStartCleaning && (
          <button onClick={e => { e.stopPropagation(); setRoomStatus(room.id, 'cleaning'); }}
            className="btn btn-primary text-xs py-1 px-2">Nettoyer</button>
        )}
        {canMarkDirty && (
          <button onClick={e => { e.stopPropagation(); setRoomStatus(room.id, 'ready'); }}
            className="btn btn-success text-xs py-1 px-2">✓ Prêt</button>
        )}
      </div>
    </div>
  );
}