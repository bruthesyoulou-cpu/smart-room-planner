export type RoomStatus = 'available' | 'reserved' | 'occupied' | 'dirty' | 'cleaning' | 'ready' | 'out_of_service';

export type RoomType = 'single' | 'double' | 'suite';

export type ReservationStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show';

export type ReservationSource = 'manual' | 'booking_com' | 'expedia' | 'airbnb' | 'google_calendar' | 'outlook';

export type HousekeepingStatus = 'dirty' | 'cleaning' | 'ready';

export type UserRole = 'reception' | 'manager' | 'housekeeping';

export type NotificationType =
  | 'checkin_imminent'
  | 'checkin_late'
  | 'checkout_imminent'
  | 'room_dirty'
  | 'room_ready'
  | 'reservation_unassigned'
  | 'reservation_conflict'
  | 'sync_error';

export interface Hotel {
  id: string;
  name: string;
  timezone: string;
  currency: string;
  address?: string;
  phone?: string;
  email?: string;
  floors: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  hotelId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  hotelId: string;
  number: string;
  floor: number;
  type: RoomType;
  capacity: number;
  status: RoomStatus;
  notes?: string;
  pricePerNight: number;
  createdAt: string;
  updatedAt: string;
}

export interface Guest {
  id: string;
  hotelId: string;
  fullName: string;
  email: string;
  phone?: string;
  idNumber?: string;
  nationality?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  hotelId: string;
  roomId?: string;
  guestId: string;
  guestName?: string;
  source: ReservationSource;
  checkInAt: string;
  checkOutAt: string;
  status: ReservationStatus;
  totalAmount: number;
  guestCount: number;
  notes?: string;
  externalReference?: string;
  assignedRoomNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HousekeepingTask {
  id: string;
  hotelId: string;
  roomId: string;
  roomNumber?: string;
  assignedTo?: string;
  status: HousekeepingStatus;
  priority: 'low' | 'normal' | 'high';
  dueAt?: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  hotelId: string;
  userId?: string;
  type: NotificationType;
  title: string;
  message: string;
  reservationId?: string;
  roomId?: string;
  readAt?: string;
  actionUrl?: string;
  createdAt: string;
}

export interface KpiData {
  occupancyRate: number;
  arrivalsToday: number;
  departuresToday: number;
  roomsToClean: number;
  estimatedRevenue: number;
}

export interface ReservationInput {
  roomId?: string;
  guestId: string;
  guestName: string;
  source: ReservationSource;
  checkInAt: string;
  checkOutAt: string;
  status: ReservationStatus;
  totalAmount: number;
  guestCount: number;
  notes?: string;
}

export const ROOM_STATUS_LABEL: Record<RoomStatus, string> = {
  available: 'Disponible',
  reserved: 'Réservée',
  occupied: 'Occupée',
  dirty: 'À nettoyer',
  cleaning: 'En nettoyage',
  ready: 'Prête',
  out_of_service: 'Hors service',
};

export const ROOM_STATUS_COLOR: Record<RoomStatus, string> = {
  available: '#22c55e',
  reserved: '#eab308',
  occupied: '#ef4444',
  dirty: '#f97316',
  cleaning: '#3b82f6',
  ready: '#22c55e',
  out_of_service: '#9ca3af',
};

export const ROOM_STATUS_ICON: Record<RoomStatus, string> = {
  available: '🟢',
  reserved: '🟡',
  occupied: '🔴',
  dirty: '🟠',
  cleaning: '🔵',
  ready: '✅',
  out_of_service: '⚪',
};

export const ROOM_TYPE_LABEL: Record<RoomType, string> = {
  single: 'Simple',
  double: 'Double',
  suite: 'Suite',
};

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  checked_in: 'Check-in fait',
  checked_out: 'Check-out fait',
  cancelled: 'Annulée',
  no_show: 'No-show',
};

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  reception: 'Réception',
  manager: 'Manager',
  housekeeping: 'Housekeeping',
};