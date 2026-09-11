import {
  CheckCircle2,
  MapPin,
  Navigation,
  Thermometer,
  Truck,
} from 'lucide-react';

import { useDemoData } from '../context/DemoDataContext';
import type { DispatchStatus } from '../types/dispatch';
import type { ReactNode } from 'react';
const statusFlow: DispatchStatus[] = [
  'Assigned',
  'En Route',
  'In Transit',
  'Delivered',
];

export default function DriverPortal() {
  const {
    dispatches,
    updateStatus,
  } = useDemoData();

  const driverName = 'Daniel Carter';

  const assignment = dispatches.find(
    (dispatch) =>
      dispatch.driver === driverName &&
      dispatch.status !== 'Delivered',
  );

  if (!assignment) {
    return (
      <div>
        <header className="mb-8">
          <p className="text-sm text-slate-500">
            Driver Portal
          </p>

          <h2 className="text-3xl font-semibold text-slate-900">
            {driverName}
          </h2>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <CheckCircle2
            size={42}
            className="mx-auto text-green-600"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No Active Assignment
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            There are currently no active dispatches assigned to you.
          </p>
        </section>
      </div>
    );
  }

  const currentIndex =
    statusFlow.indexOf(assignment.status);

  const nextStatus =
    currentIndex >= 0
      ? statusFlow[currentIndex + 1]
      : undefined;

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="text-sm text-slate-500">
          Driver Portal
        </p>

        <h2 className="text-3xl font-semibold text-slate-900">
          {driverName}
        </h2>

        <p className="mt-2 text-slate-500">
          Current transport assignment
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Active Dispatch
              </p>

              <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                {assignment.id}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {assignment.client}
              </p>
            </div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
              {assignment.status}
            </span>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <InfoCard
            icon={<MapPin size={20} />}
            label="Pickup"
            value={assignment.pickup}
          />

          <InfoCard
            icon={<Navigation size={20} />}
            label="Destination"
            value={assignment.destination}
          />

          <InfoCard
            icon={<Truck size={20} />}
            label="Vehicle"
            value="Apex Unit 03"
          />

          <InfoCard
            icon={<Thermometer size={20} />}
            label="Temperature"
            value={
              assignment.temperature !== null
                ? `${assignment.temperature.toFixed(1)}°F`
                : 'Not available'
            }
          />
        </div>

        <div className="border-t border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900">
            Assignment Progress
          </h4>

          <div className="mt-5 flex flex-wrap gap-3">
            {statusFlow.map((status, index) => {
              const completed =
                index <= currentIndex;

              return (
                <div
                  key={status}
                  className={[
                    'rounded-lg px-4 py-2 text-sm font-medium',
                    completed
                      ? 'bg-[#22262C] text-white'
                      : 'bg-slate-100 text-slate-400',
                  ].join(' ')}
                >
                  {status}
                </div>
              );
            })}
          </div>

          {nextStatus && (
            <button
              type="button"
              onClick={() =>
                updateStatus(
                  assignment.id,
                  nextStatus,
                )
              }
              className="mt-6 w-full rounded-lg bg-[#FF6A00] px-5 py-3 font-medium text-white hover:opacity-90"
            >
              Mark as {nextStatus}
            </button>
          )}

          {assignment.status === 'Delivered' && (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-700">
              Delivery completed successfully.
            </div>
          )}
        </div>
      </section>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
        Demonstration environment. Navigation, GPS, temperature,
        vehicle, and assignment information are simulated.
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg bg-slate-50 p-4">
      <div className="mt-0.5 text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 font-medium text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}