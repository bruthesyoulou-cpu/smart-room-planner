import { useAppStore } from './store/useAppStore';
import KpiBar from './components/KpiBar';
import FilterBar from './components/FilterBar';
import RoomGrid from './components/RoomGrid';
import Timeline from './components/Timeline';
import RoomDetail from './components/RoomDetail';

export default function App() {
  const { showTimeline, selectedRoom } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏨</span>
            <div>
              <h1 className="text-lg font-bold text-white">Smart Room Planner</h1>
              <p className="text-xs text-gray-500">Hôtel Ndiambour · Dakar</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge bg-blue-900/40 text-blue-400 border border-blue-800">Réception</span>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-medium">BS</div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <KpiBar />
        <FilterBar />
        {showTimeline && <Timeline />}
        <RoomGrid />
      </main>

      {selectedRoom && <RoomDetail />}
    </div>
  );
}