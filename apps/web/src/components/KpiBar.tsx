import { useAppStore } from '../store/useAppStore';

export default function KpiBar() {
  const kpis = useAppStore(s => s.kpis);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
      <KpiCard label="Occupation" value={`${kpis.occupancyRate}%`} color="text-emerald-400" />
      <KpiCard label="Arrivées" value={String(kpis.arrivalsToday)} color="text-blue-400" />
      <KpiCard label="Départs" value={String(kpis.departuresToday)} color="text-orange-400" />
      <KpiCard label="À nettoyer" value={String(kpis.roomsToClean)} color="text-purple-400" />
      <KpiCard label="Revenus" value={`${kpis.estimatedRevenue.toLocaleString('fr')} FCFA`} color="text-amber-400" />
    </div>
  );
}

function KpiCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="kpi-card">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}