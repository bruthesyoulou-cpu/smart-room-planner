import type { Room, Reservation, KpiData, RoomStatus } from '@srp/types';

export const STATUS_CARD_CLASS: Record<RoomStatus, string> = {
  available: 'room-card room-card-available',
  reserved: 'room-card room-card-reserved',
  occupied: 'room-card room-card-occupied',
  dirty: 'room-card room-card-dirty',
  cleaning: 'room-card room-card-cleaning',
  ready: 'room-card room-card-ready',
  out_of_service: 'room-card room-card-out',
};

function daysBetween(a: string, b: string) {
  return Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

// ----- MOCK HOTEL -----
const hotelId = 'h1';
const now = new Date();
const fmt = (d: Date, h: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), h).toISOString();

const today = fmt(now, 0);
const tomorrow = fmt(new Date(now.getTime() + 86_400_000), 0);
const yesterday = fmt(new Date(now.getTime() - 86_400_000), 0);
const dayAfter = fmt(new Date(now.getTime() + 2 * 86_400_000), 0);
const days3 = fmt(new Date(now.getTime() + 3 * 86_400_000), 0);

// ----- ROOMS -----
export const mockRooms: Room[] = [
  { id: 'r1', hotelId, number: '101', floor: 1, type: 'single', capacity: 1, status: 'available', pricePerNight: 80, createdAt: today, updatedAt: today },
  { id: 'r2', hotelId, number: '102', floor: 1, type: 'double', capacity: 2, status: 'occupied', pricePerNight: 120, createdAt: today, updatedAt: today },
  { id: 'r3', hotelId, number: '103', floor: 1, type: 'single', capacity: 1, status: 'reserved', pricePerNight: 80, createdAt: today, updatedAt: today },
  { id: 'r4', hotelId, number: '104', floor: 1, type: 'suite', capacity: 3, status: 'available', pricePerNight: 200, createdAt: today, updatedAt: today },
  { id: 'r5', hotelId, number: '105', floor: 1, type: 'double', capacity: 2, status: 'dirty', pricePerNight: 120, createdAt: today, updatedAt: today },
  { id: 'r6', hotelId, number: '201', floor: 2, type: 'single', capacity: 1, status: 'available', pricePerNight: 90, createdAt: today, updatedAt: today },
  { id: 'r7', hotelId, number: '202', floor: 2, type: 'double', capacity: 2, status: 'occupied', pricePerNight: 130, createdAt: today, updatedAt: today },
  { id: 'r8', hotelId, number: '203', floor: 2, type: 'suite', capacity: 3, status: 'cleaning', pricePerNight: 210, createdAt: today, updatedAt: today },
  { id: 'r9', hotelId, number: '204', floor: 2, type: 'double', capacity: 2, status: 'reserved', pricePerNight: 130, createdAt: today, updatedAt: today },
  { id: 'r10', hotelId, number: '205', floor: 2, type: 'single', capacity: 1, status: 'available', pricePerNight: 90, createdAt: today, updatedAt: today },
  { id: 'r11', hotelId, number: '301', floor: 3, type: 'suite', capacity: 4, status: 'occupied', pricePerNight: 250, createdAt: today, updatedAt: today },
  { id: 'r12', hotelId, number: '302', floor: 3, type: 'double', capacity: 2, status: 'available', pricePerNight: 140, createdAt: today, updatedAt: today },
  { id: 'r13', hotelId, number: '303', floor: 3, type: 'single', capacity: 1, status: 'out_of_service', pricePerNight: 95, createdAt: today, updatedAt: today },
  { id: 'r14', hotelId, number: '304', floor: 3, type: 'suite', capacity: 3, status: 'reserved', pricePerNight: 260, createdAt: today, updatedAt: today },
  { id: 'r15', hotelId, number: '305', floor: 3, type: 'double', capacity: 2, status: 'dirty', pricePerNight: 140, createdAt: today, updatedAt: today },
];

// ----- RESERVATIONS -----
export const mockReservations: Reservation[] = [
  { id: 'res1', hotelId, roomId: 'r2', guestId: 'g1', guestName: 'Amadou Sow', source: 'manual', checkInAt: yesterday, checkOutAt: dayAfter, status: 'checked_in', totalAmount: 360, guestCount: 1, assignedRoomNumber: '102', createdAt: yesterday, updatedAt: yesterday },
  { id: 'res2', hotelId, roomId: 'r3', guestId: 'g2', guestName: 'Fatou Diallo', source: 'booking_com', checkInAt: today, checkOutAt: days3, status: 'confirmed', totalAmount: 240, guestCount: 1, assignedRoomNumber: '103', createdAt: yesterday, updatedAt: yesterday },
  { id: 'res3', hotelId, roomId: 'r7', guestId: 'g3', guestName: 'Marie Diop', source: 'expedia', checkInAt: yesterday, checkOutAt: tomorrow, status: 'checked_in', totalAmount: 260, guestCount: 2, assignedRoomNumber: '202', createdAt: yesterday, updatedAt: yesterday },
  { id: 'res4', hotelId, roomId: 'r9', guestId: 'g4', guestName: 'Jean Mendy', source: 'airbnb', checkInAt: tomorrow, checkOutAt: days3, status: 'confirmed', totalAmount: 260, guestCount: 2, assignedRoomNumber: '204', createdAt: today, updatedAt: today },
  { id: 'res5', hotelId, roomId: 'r11', guestId: 'g5', guestName: 'Claire Ndiaye', source: 'manual', checkInAt: yesterday, checkOutAt: tomorrow, status: 'checked_in', totalAmount: 500, guestCount: 3, assignedRoomNumber: '301', createdAt: yesterday, updatedAt: yesterday },
  { id: 'res6', hotelId, roomId: 'r14', guestId: 'g6', guestName: 'Moussa Fall', source: 'booking_com', checkInAt: dayAfter, checkOutAt: days3, status: 'confirmed', totalAmount: 520, guestCount: 2, assignedRoomNumber: '304', createdAt: today, updatedAt: today },
  { id: 'res7', hotelId, roomId: undefined, guestId: 'g7', guestName: 'Aminata Ba', source: 'manual', checkInAt: today, checkOutAt: dayAfter, status: 'pending', totalAmount: 120, guestCount: 1, createdAt: today, updatedAt: today },
];

// ----- KPIS -----
export function computeKpis(): KpiData {
  const rooms = mockRooms.filter(r => r.status !== 'out_of_service');
  const totalRooms = rooms.length;
  const occupied = rooms.filter(r => r.status === 'occupied').length;
  const reserved = rooms.filter(r => r.status === 'reserved').length;
  const dirtyCount = rooms.filter(r => r.status === 'dirty' || r.status === 'cleaning').length;

  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowDate = new Date(todayDate.getTime() + 86_400_000);

  const arrivals = mockReservations.filter(r => {
    const d = new Date(r.checkInAt);
    return d >= todayDate && d < tomorrowDate && (r.status === 'confirmed' || r.status === 'checked_in' || r.status === 'pending');
  }).length;

  const departures = mockReservations.filter(r => {
    const d = new Date(r.checkOutAt);
    return d >= todayDate && d < tomorrowDate && r.status === 'checked_in';
  }).length;

  const revenue = mockReservations
    .filter(r => r.status === 'checked_in' || r.status === 'confirmed')
    .reduce((sum, r) => sum + r.totalAmount, 0);

  return {
    occupancyRate: totalRooms > 0 ? Math.round(((occupied + reserved) / totalRooms) * 100) : 0,
    arrivalsToday: arrivals,
    departuresToday: departures,
    roomsToClean: dirtyCount,
    estimatedRevenue: revenue,
  };
}

// ----- TIMELINE DATA -----
export interface TimelineDay {
  date: Date;
  label: string;
  isToday: boolean;
}

export interface TimelineSlot {
  roomId: string;
  reservationId: string;
  guestName: string;
  start: number;
  span: number;
  status: string;
}

export function getTimelineDays(): TimelineDay[] {
  const days: TimelineDay[] = [];
  for (let i = -2; i <= 5; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    days.push({
      date: d,
      label: d.toLocaleDateString('fr', { weekday: 'short', day: 'numeric', month: 'short' }),
      isToday: d.getTime() === todayDate.getTime(),
    });
  }
  return days;
}

export function getTimelineSlots(): TimelineSlot[] {
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
  return mockReservations
    .filter(r => r.roomId)
    .map(r => ({
      roomId: r.roomId!,
      reservationId: r.id,
      guestName: r.guestName ?? '?',
      start: daysBetween(fmt(base, 0), r.checkInAt),
      span: Math.max(1, daysBetween(r.checkInAt, r.checkOutAt)),
      status: r.status,
    }));
}