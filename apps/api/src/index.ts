import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';
import type { Room, Reservation, HousekeepingTask, KpiData, Notification } from '@srp/types';

// ---- MOCK DATA ----
const now = new Date();
const fmt = (d: Date, h: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), h).toISOString();
const today = fmt(now, 0);

const rooms: Room[] = [
  { id: 'r1', hotelId: 'h1', number: '101', floor: 1, type: 'single', capacity: 1, status: 'available', pricePerNight: 80, createdAt: today, updatedAt: today },
  { id: 'r2', hotelId: 'h1', number: '102', floor: 1, type: 'double', capacity: 2, status: 'occupied', pricePerNight: 120, createdAt: today, updatedAt: today },
  { id: 'r3', hotelId: 'h1', number: '103', floor: 1, type: 'single', capacity: 1, status: 'reserved', pricePerNight: 80, createdAt: today, updatedAt: today },
  { id: 'r4', hotelId: 'h1', number: '104', floor: 1, type: 'suite', capacity: 3, status: 'available', pricePerNight: 200, createdAt: today, updatedAt: today },
  { id: 'r5', hotelId: 'h1', number: '105', floor: 1, type: 'double', capacity: 2, status: 'dirty', pricePerNight: 120, createdAt: today, updatedAt: today },
  { id: 'r6', hotelId: 'h1', number: '201', floor: 2, type: 'single', capacity: 1, status: 'available', pricePerNight: 90, createdAt: today, updatedAt: today },
  { id: 'r7', hotelId: 'h1', number: '202', floor: 2, type: 'double', capacity: 2, status: 'occupied', pricePerNight: 130, createdAt: today, updatedAt: today },
  { id: 'r8', hotelId: 'h1', number: '203', floor: 2, type: 'suite', capacity: 3, status: 'cleaning', pricePerNight: 210, createdAt: today, updatedAt: today },
  { id: 'r9', hotelId: 'h1', number: '204', floor: 2, type: 'double', capacity: 2, status: 'reserved', pricePerNight: 130, createdAt: today, updatedAt: today },
  { id: 'r10', hotelId: 'h1', number: '205', floor: 2, type: 'single', capacity: 1, status: 'available', pricePerNight: 90, createdAt: today, updatedAt: today },
  { id: 'r11', hotelId: 'h1', number: '301', floor: 3, type: 'suite', capacity: 4, status: 'occupied', pricePerNight: 250, createdAt: today, updatedAt: today },
  { id: 'r12', hotelId: 'h1', number: '302', floor: 3, type: 'double', capacity: 2, status: 'available', pricePerNight: 140, createdAt: today, updatedAt: today },
  { id: 'r13', hotelId: 'h1', number: '303', floor: 3, type: 'single', capacity: 1, status: 'out_of_service', pricePerNight: 95, createdAt: today, updatedAt: today },
  { id: 'r14', hotelId: 'h1', number: '304', floor: 3, type: 'suite', capacity: 3, status: 'reserved', pricePerNight: 260, createdAt: today, updatedAt: today },
  { id: 'r15', hotelId: 'h1', number: '305', floor: 3, type: 'double', capacity: 2, status: 'dirty', pricePerNight: 140, createdAt: today, updatedAt: today },
];

const reservations: Reservation[] = [
  { id: 'res1', hotelId: 'h1', roomId: 'r2', guestId: 'g1', guestName: 'Amadou Sow', source: 'manual', checkInAt: fmt(new Date(now.getTime() - 86400000), 14), checkOutAt: fmt(new Date(now.getTime() + 2 * 86400000), 11), status: 'checked_in', totalAmount: 360, guestCount: 1, assignedRoomNumber: '102', createdAt: today, updatedAt: today },
  { id: 'res2', hotelId: 'h1', roomId: 'r3', guestId: 'g2', guestName: 'Fatou Diallo', source: 'booking_com', checkInAt: fmt(new Date(now), 14), checkOutAt: fmt(new Date(now.getTime() + 3 * 86400000), 11), status: 'confirmed', totalAmount: 240, guestCount: 1, assignedRoomNumber: '103', createdAt: today, updatedAt: today },
  { id: 'res7', hotelId: 'h1', roomId: undefined, guestId: 'g7', guestName: 'Aminata Ba', source: 'manual', checkInAt: today, checkOutAt: fmt(new Date(now.getTime() + 86400000), 11), status: 'pending', totalAmount: 120, guestCount: 1, createdAt: today, updatedAt: today },
];

// ---- WebSocket ----
const wssClients = new Set<import('ws').WebSocket>();

function broadcast(type: string, data: unknown) {
  const msg = JSON.stringify({ type, data, timestamp: new Date().toISOString() });
  wssClients.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

// ---- Express ----
const app = express();
app.use(cors());
app.use(express.json());

// GET /api/rooms
app.get('/api/rooms', (_req, res) => { res.json(rooms); });

// PATCH /api/rooms/:id/status
app.patch('/api/rooms/:id/status', (req, res) => {
  const room = rooms.find(r => r.id === req.params.id);
  if (!room) return res.status(404).json({ error: 'Chambre introuvable' });
  room.status = req.body.status;
  room.updatedAt = new Date().toISOString();
  broadcast('room_updated', room);
  res.json(room);
});

// GET /api/reservations
app.get('/api/reservations', (_req, res) => { res.json(reservations); });

// POST /api/reservations
app.post('/api/reservations', (req, res) => {
  const newRes: Reservation = {
    ...req.body,
    id: uuid(),
    hotelId: 'h1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  reservations.push(newRes);
  broadcast('reservation_created', newRes);
  res.status(201).json(newRes);
});

// GET /api/kpis
app.get('/api/kpis', (_req, res) => {
  const activeRooms = rooms.filter(r => r.status !== 'out_of_service');
  const occupied = activeRooms.filter(r => r.status === 'occupied').length;
  const reserved = activeRooms.filter(r => r.status === 'reserved').length;
  const dirty = activeRooms.filter(r => r.status === 'dirty' || r.status === 'cleaning').length;
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowDate = new Date(todayDate.getTime() + 86_400_000);
  const arrivals = reservations.filter(r => { const d = new Date(r.checkInAt); return d >= todayDate && d < tomorrowDate && (r.status === 'confirmed' || r.status === 'checked_in' || r.status === 'pending'); }).length;
  const departures = reservations.filter(r => { const d = new Date(r.checkOutAt); return d >= todayDate && d < tomorrowDate && r.status === 'checked_in'; }).length;
  const revenue = reservations.filter(r => r.status === 'checked_in' || r.status === 'confirmed').reduce((s, r) => s + r.totalAmount, 0);

  const kpis: KpiData = {
    occupancyRate: activeRooms.length > 0 ? Math.round(((occupied + reserved) / activeRooms.length) * 100) : 0,
    arrivalsToday: arrivals,
    departuresToday: departures,
    roomsToClean: dirty,
    estimatedRevenue: revenue,
  };
  res.json(kpis);
});

// GET /api/alerts
app.get('/api/alerts', (_req, res) => {
  const alerts: Notification[] = [];
  reservations.filter(r => r.status === 'pending' && !r.roomId).forEach(r => {
    alerts.push({
      id: uuid(), hotelId: 'h1', type: 'reservation_unassigned',
      title: 'Réservation non assignée',
      message: `${r.guestName} n'a pas de chambre.`,
      reservationId: r.id, createdAt: new Date().toISOString(),
    });
  });
  res.json(alerts);
});

// Health
app.get('/api/health', (_req, res) => { res.json({ status: 'ok', uptime: process.uptime() }); });

// ---- Server ----
const port = 4000;
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  wssClients.add(ws);
  ws.send(JSON.stringify({ type: 'connected', rooms, reservations }));
  ws.on('close', () => wssClients.delete(ws));
});

server.listen(port, () => {
  console.log(`🏨 Smart Room Planner API → http://localhost:${port}`);
});