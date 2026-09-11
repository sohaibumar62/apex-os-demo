import {
  CheckCircle2,
  Clock,
  MapPin,
  Thermometer,
  Truck,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useDemoData } from '../context/DemoDataContext';

export default function ClientPortal() {
  const { dispatches } = useDemoData();

  const clientName = 'Pacific Diagnostics';

  const clientDispatches = dispatches.filter(
    (dispatch) => dispatch.client === clientName,
  );

  const activeDispatches = clientDispatches.filter(
    (dispatch) => dispatch.status !== 'Delivered',
  );

  const completedDispatches = clientDispatches.filter(
    (dispatch) => dispatch.status === 'Delivered',
  );

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm text-slate-500">
          Client Portal
        </p>

        <h2 className="text-3xl font-semibold text-slate-900">
          {clientName}
        </h2>

        <p className="mt-2 text-slate-500">
          Track current and completed transport requests.
        </p>
      </header>

      <section className="mb-8 grid gap-5 md:grid-cols-3">
        <StatCard
          label="Active Dispatches"
          value={activeDispatches.length}
          icon={<Truck size={22} />}
        />

        <StatCard
          label="Completed"
          value={completedDispatches.length}
          icon={<CheckCircle2 size={22} />}
        />

        <StatCard
          label="Total Requests"
          value={clientDispatches.length}
          icon={<Clock size={22} />}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            My Dispatches
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Current transportation activity
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {clientDispatches.length === 0 && (
            <div className="p-6 text-sm text-slate-500">
              No dispatches available.
            </div>
          )}

          {clientDispatches.map((dispatch) => (
            <div
              key={dispatch.id}
              className="p-6"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-slate-900">
                      {dispatch.id}
                    </h4>

                    <StatusBadge status={dispatch.status} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={17}
                        className="text-slate-400"
                      />

                      <span>
                        {dispatch.pickup}
                        {' → '}
                        {dispatch.destination}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Truck
                        size={17}
                        className="text-slate-400"
                      />

                      <span>
                        {dispatch.driver ?? 'Awaiting assignment'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Thermometer
                        size={17}
                        className="text-slate-400"
                      />

                      <span>
                        {dispatch.temperature !== null
                          ? `${dispatch.temperature.toFixed(1)}°F`
                          : 'Temperature pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {dispatch.temperature !== null && (
                  <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                    Cold chain within range
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
        Demonstration environment. Location, temperature,
        driver, and dispatch data are simulated.
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-slate-100 p-3 text-slate-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Assigned: 'bg-blue-100 text-blue-700',
    'En Route': 'bg-indigo-100 text-indigo-700',
    'In Transit': 'bg-green-100 text-green-700',
    Delivered: 'bg-slate-100 text-slate-700',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? 'bg-slate-100 text-slate-700'
      }`}
    >
      {status}
    </span>
  );
}