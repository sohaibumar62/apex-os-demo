import {
  Activity,
  MapPin,
  Thermometer,
  Truck,
  User,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useDemoData } from '../context/DemoDataContext';

export default function ActivePulse() {
  const { dispatches } = useDemoData();

  const activeDispatch =
    dispatches.find((dispatch) =>
      ['Assigned', 'En Route', 'In Transit'].includes(
        dispatch.status,
      ),
    ) ?? dispatches[0];

  if (!activeDispatch) {
    return (
      <div className="text-slate-600">
        No active dispatches.
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm text-slate-500">
          Operations
        </p>

        <h2 className="text-3xl font-semibold text-slate-900">
          Active Pulse
        </h2>

        <p className="mt-2 text-slate-500">
          Live operational view of active transport.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  South Orange County Operations
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Demonstration map
                </p>
              </div>

              <span className="flex items-center gap-2 text-sm font-medium text-green-700">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Live
              </span>
            </div>
          </div>

          <div className="relative min-h-[500px] bg-slate-200">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="absolute left-[18%] top-[65%]">
              <LocationMarker label={activeDispatch.pickup} />
            </div>

            <div className="absolute right-[18%] top-[22%]">
              <LocationMarker
                label={activeDispatch.destination}
              />
            </div>

            <div className="absolute left-[46%] top-[43%]">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-orange-400/20 animate-ping" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6A00] text-white shadow-lg">
                  <Truck size={22} />
                </div>
              </div>

              <div className="mt-3 whitespace-nowrap rounded-lg bg-[#22262C] px-3 py-2 text-xs text-white shadow-lg">
                {activeDispatch.id}
              </div>
            </div>

            <div className="absolute bottom-5 left-5 rounded-lg bg-white/95 px-4 py-3 text-sm shadow">
              <p className="font-medium text-slate-900">
                Simulated location
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Real GPS integration will follow in production.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Active Dispatch
                </p>

                <h3 className="mt-1 text-xl font-semibold text-slate-900">
                  {activeDispatch.id}
                </h3>
              </div>

              <Activity className="text-[#FF6A00]" />
            </div>

            <div className="mt-6 space-y-5">
              <PulseItem
                icon={<User size={19} />}
                label="Driver"
                value={
                  activeDispatch.driver ??
                  'Not assigned'
                }
              />

              <PulseItem
                icon={<MapPin size={19} />}
                label="Route"
                value={`${activeDispatch.pickup} → ${activeDispatch.destination}`}
              />

              <PulseItem
                icon={<Truck size={19} />}
                label="Status"
                value={activeDispatch.status}
              />

              <PulseItem
                icon={<Thermometer size={19} />}
                label="Temperature"
                value={
                  activeDispatch.temperature !== null
                    ? `${activeDispatch.temperature.toFixed(1)}°F`
                    : 'Not available'
                }
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Cold Chain
            </p>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-4xl font-semibold text-slate-900">
                  {activeDispatch.temperature !== null
                    ? activeDispatch.temperature.toFixed(1)
                    : '--'}
                  <span className="text-lg text-slate-500">
                    °F
                  </span>
                </p>

                <p className="mt-2 text-sm text-green-700">
                  Within verified range
                </p>
              </div>

              <Thermometer
                size={34}
                className="text-green-600"
              />
            </div>

            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[62%] rounded-full bg-green-500" />
              </div>

              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>33°F</span>
                <span>46°F</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function LocationMarker({
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#22262C] text-white shadow">
        <MapPin size={17} />
      </div>

      <span className="mt-2 whitespace-nowrap rounded bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow">
        {label}
      </span>
    </div>
  );
}

function PulseItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-slate-400">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}