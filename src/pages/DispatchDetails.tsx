import {
  ArrowLeft,
  MapPin,
  Thermometer,
  Truck,
  User,
} from 'lucide-react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import type { ReactNode } from 'react';
import { useDemoData } from '../context/DemoDataContext';
import type { DispatchStatus } from '../types/dispatch';

const drivers = [
  'Daniel Carter',
  'Michael Reed',
  'James Walker',
];

const statusFlow: DispatchStatus[] = [
  'Pending',
  'Assigned',
  'En Route',
  'In Transit',
  'Delivered',
];

export default function DispatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getDispatch,
    assignDriver,
    updateStatus,
  } = useDemoData();

  const dispatch = id
    ? getDispatch(id)
    : undefined;

  if (!dispatch) {
    return (
      <div>
        <p className="text-slate-600">
          Dispatch not found.
        </p>
      </div>
    );
  }

  const currentStatusIndex =
    statusFlow.indexOf(dispatch.status);

  const nextStatus =
    statusFlow[currentStatusIndex + 1];

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/dispatch')}
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Dispatch
      </button>

      <header className="mb-8">
        <p className="text-sm text-slate-500">
          Dispatch
        </p>

        <h2 className="text-3xl font-semibold text-slate-900">
          {dispatch.id}
        </h2>

        <p className="mt-2 text-slate-500">
          {dispatch.client}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Transport Details
          </h3>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <InfoItem
              icon={<MapPin size={20} />}
              label="Pickup"
              value={dispatch.pickup}
            />

            <InfoItem
              icon={<MapPin size={20} />}
              label="Destination"
              value={dispatch.destination}
            />

            <InfoItem
              icon={<User size={20} />}
              label="Driver"
              value={dispatch.driver ?? 'Unassigned'}
            />

            <InfoItem
              icon={<Truck size={20} />}
              label="Vehicle"
              value={
                dispatch.driver
                  ? 'Apex Unit 03'
                  : 'Not assigned'
              }
            />

            <InfoItem
              icon={<Thermometer size={20} />}
              label="Temperature"
              value={
                dispatch.temperature !== null
                  ? `${dispatch.temperature.toFixed(1)}°F`
                  : 'Not available'
              }
            />

            <InfoItem
              icon={<Truck size={20} />}
              label="Status"
              value={dispatch.status}
            />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Dispatch Controls
          </h3>

          {!dispatch.driver && (
            <div className="mt-5">
              <label
                htmlFor="driver"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Assign Driver
              </label>

              <select
                id="driver"
                defaultValue=""
                onChange={(event) => {
                  if (event.target.value) {
                    assignDriver(
                      dispatch.id,
                      event.target.value,
                    );
                  }
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
              >
                <option value="" disabled>
                  Select driver
                </option>

                {drivers.map((driver) => (
                  <option
                    key={driver}
                    value={driver}
                  >
                    {driver}
                  </option>
                ))}
              </select>
            </div>
          )}

          {dispatch.driver && nextStatus && (
            <button
              type="button"
              onClick={() =>
                updateStatus(
                  dispatch.id,
                  nextStatus,
                )
              }
              className="mt-5 w-full rounded-lg bg-[#FF6A00] px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Mark as {nextStatus}
            </button>
          )}

          {dispatch.status === 'Delivered' && (
            <div className="mt-5 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700">
              Dispatch completed successfully.
            </div>
          )}
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Status Timeline
        </h3>

        <div className="mt-6 flex flex-wrap gap-3">
          {statusFlow.map((status, index) => {
            const completed =
              index <= currentStatusIndex;

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
      </section>
    </div>
  );
}

function InfoItem({
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