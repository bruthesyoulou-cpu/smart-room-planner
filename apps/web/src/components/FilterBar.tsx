import { useAppStore } from '../store/useAppStore';
import type { RoomType, RoomStatus } from '@srp/types';
import { ROOM_TYPE_LABEL, ROOM_STATUS_LABEL } from '@srp/types';

export default function FilterBar() {
  const {
    filterFloor, filterType, filterStatus, search, viewMode,
    setFilterFloor, setFilterType, setFilterStatus, setSearch,
    clearFilters, setViewMode, showTimeline, setShowTimeline,
  } = useAppStore();

  const floors = [1, 2, 3];
  const types: RoomType[] = ['single', 'double', 'suite'];
  const statuses: RoomStatus[] = ['available', 'reserved', 'occupied', 'dirty', 'cleaning', 'ready', 'out_of_service'];

  const active = filterFloor !== null || filterType !== null || filterStatus !== null || search !== '';

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Floor */}
      <select
        value={filterFloor ?? ''}
        onChange={e => setFilterFloor(e.target.value ? Number(e.target.value) : null)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
      >
        <option value="">Tous les étages</option>
        {floors.map(f => <option key={f} value={f}>Étage {f}</option>)}
      </select>

      {/* Type */}
      <select
        value={filterType ?? ''}
        onChange={e => setFilterType((e.target.value || null) as RoomType | null)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
      >
        <option value="">Tous types</option>
        {types.map(t => <option key={t} value={t}>{ROOM_TYPE_LABEL[t]}</option>)}
      </select>

      {/* Status */}
      <select
        value={filterStatus ?? ''}
        onChange={e => setFilterStatus((e.target.value || null) as RoomStatus | null)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
      >
        <option value="">Tous statuts</option>
        {statuses.map(s => <option key={s} value={s}>{ROOM_STATUS_LABEL[s]}</option>)}
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="N° chambre..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none w-36"
      />

      {active && (
        <button onClick={clearFilters} className="btn btn-ghost text-xs">✕ Réinitialiser</button>
      )}

      <div className="flex-1" />

      {/* View mode */}
      <button onClick={() => setViewMode('grid')} className={`btn btn-ghost text-xs ${viewMode === 'grid' ? 'bg-gray-700' : ''}`}>▦ Grille</button>
      <button onClick={() => setViewMode('list')} className={`btn btn-ghost text-xs ${viewMode === 'list' ? 'bg-gray-700' : ''}`}>☰ Liste</button>
      <button
        onClick={() => setShowTimeline(!showTimeline)}
        className={`btn btn-ghost text-xs ${showTimeline ? 'bg-blue-900/40 text-blue-400' : ''}`}
      >
        📅 Timeline
      </button>
    </div>
  );
}