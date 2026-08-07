import { create } from 'zustand';
import type { Room, Reservation, RoomStatus, RoomType } from '@srp/types';
import { mockRooms, mockReservations, computeKpis, type TimelineDay, type TimelineSlot, getTimelineDays, getTimelineSlots } from '../data/mock';

interface AppState {
  // Rooms
  rooms: Room[];
  setRoomStatus: (roomId: string, status: RoomStatus) => void;

  // Reservations
  reservations: Reservation[];
  addReservation: (r: Reservation) => void;

  // Filters
  filterFloor: number | null;
  filterType: RoomType | null;
  filterStatus: RoomStatus | null;
  search: string;
  setFilterFloor: (f: number | null) => void;
  setFilterType: (t: RoomType | null) => void;
  setFilterStatus: (s: RoomStatus | null) => void;
  setSearch: (s: string) => void;
  clearFilters: () => void;

  // View
  viewMode: 'grid' | 'list';
  setViewMode: (m: 'grid' | 'list') => void;
  selectedRoom: Room | null;
  setSelectedRoom: (r: Room | null) => void;
  showTimeline: boolean;
  setShowTimeline: (v: boolean) => void;

  // Derived
  kpis: ReturnType<typeof computeKpis>;
  filteredRooms: () => Room[];
  timelineDays: TimelineDay[];
  timelineSlots: TimelineSlot[];

  // Actions
  refresh: () => void;
}

let nextResId = 100;

export const useAppStore = create<AppState>((set, get) => ({
  rooms: mockRooms,
  reservations: mockReservations,
  filterFloor: null,
  filterType: null,
  filterStatus: null,
  search: '',
  viewMode: 'grid',
  selectedRoom: null,
  showTimeline: false,
  kpis: computeKpis(),
  timelineDays: getTimelineDays(),
  timelineSlots: getTimelineSlots(),

  setRoomStatus: (roomId, status) => {
    const rooms = get().rooms.map(r => (r.id === roomId ? { ...r, status, updatedAt: new Date().toISOString() } : r));
    set({ rooms, kpis: computeKpis() });
  },

  addReservation: (r) => {
    const reservation = { ...r, id: `res${nextResId++}` };
    const reservations = [...get().reservations, reservation];
    set({ reservations, kpis: computeKpis() });
  },

  setFilterFloor: (f) => set({ filterFloor: f }),
  setFilterType: (t) => set({ filterType: t }),
  setFilterStatus: (s) => set({ filterStatus: s }),
  setSearch: (s) => set({ search: s }),
  clearFilters: () => set({ filterFloor: null, filterType: null, filterStatus: null, search: '' }),
  setViewMode: (m) => set({ viewMode: m }),
  setSelectedRoom: (r) => set({ selectedRoom: r }),
  setShowTimeline: (v) => set({ showTimeline: v }),

  filteredRooms: () => {
    const { rooms, filterFloor, filterType, filterStatus, search } = get();
    return rooms.filter(r => {
      if (filterFloor !== null && r.floor !== filterFloor) return false;
      if (filterType && r.type !== filterType) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      if (search && !r.number.includes(search) && !r.type.includes(search.toLowerCase())) return false;
      return true;
    });
  },

  refresh: () => set({ kpis: computeKpis(), timelineDays: getTimelineDays(), timelineSlots: getTimelineSlots() }),
}));