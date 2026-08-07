import { useAppStore, type TimelineSlot } from '../store/useAppStore';
import { mockRooms } from '../data/mock';

export default function Timeline() {
  const { timelineDays, timelineSlots, setShowTimeline, rooms } = useAppStore();
  const cols = timelineDays.length;

  const roomReservations: Record<string, TimelineSlot[]> = {};
  timelineSlots.forEach(s => {
    if (!roomReservations[s.roomId]) roomReservations[s.roomId] = [];
    roomReservations[s.roomId].push(s);
  });

  return (
    <div className="border border-gray-800 rounded-xl bg-gray-900/60 p-4 mb-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-200">📅 Timeline des réservations</h3>
        <button onClick={() => setShowTimeline(false)} className="btn btn-ghost text-xs">✕ Fermer</button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid" style={{ gridTemplateColumns: `120px repeat(${cols}, 1fr)` }}>
            <div className="text-xs text-gray-500 py-1">Chambre</div>
            {timelineDays.map((d, i) => (
              <div key={i} className={`text-xs text-center py-1 border-l border-gray-800 ${d.isToday ? 'bg-blue-900/30 rounded-t font-bold text-blue-400' : 'text-gray-500'}`}>
                {d.label}
              </div>
            ))}
          </div>

          {mockRooms.map(room => {
            const slots = roomReservations[room.id] ?? [];
            return (
              <div key={room.id} className="grid border-t border-gray-800/50" style={{ gridTemplateColumns: `120px repeat(${cols}, 1fr)` }}>
                <div className="text-xs text-gray-300 py-2 flex items-center">{room.number}</div>
                {timelineDays.map((_, ci) => {
                  const slot = slots.find(s => s.start <= ci && ci < s.start + s.span);
                  if (!slot) {
                    return <div key={ci} className="border-l border-gray-800/30 py-2" />;
                  }
                  const isFirst = ci === slot.start;
                  const isLast = ci === slot.start + slot.span - 1;
                  return (
                    <div key={ci} className={`border-l border-gray-800/30 py-2 ${isFirst ? 'ml-0.5' : ''} ${isLast ? 'mr-0.5' : ''}`}>
                      {isFirst && (
                        <div
                          className={`
                            rounded-md px-1.5 py-1 h-full text-xs font-medium truncate
                            ${slot.status === 'checked_in' ? 'bg-red-900/60 text-red-300' : ''}
                            ${slot.status === 'confirmed' ? 'bg-yellow-900/60 text-yellow-300' : ''}
                            ${slot.status === 'pending' ? 'bg-gray-800 text-gray-400' : ''}
                          `}
                          style={{ width: `${slot.span * 100}%` }}
                        >
                          {slot.guestName}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}