import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useDemoData } from '../context/DemoDataContext';
import type { Dispatch } from '../types/dispatch';

const statusStyles: Record<Dispatch['status'], string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Assigned: 'bg-blue-100 text-blue-700',
  'En Route': 'bg-indigo-100 text-indigo-700',
  'In Transit': 'bg-green-100 text-green-700',
  Delivered: 'bg-slate-100 text-slate-700',
};

export default function Dispatches() {
  const navigate = useNavigate();

  const {
    dispatches,
    createDispatch,
  } = useDemoData();

  return (
    <div>
      <header className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Operations
          </p>

          <h2 className="text-3xl font-semibold text-slate-900">
            Dispatch
          </h2>

          <p className="mt-2 text-slate-500">
            Manage active and pending transport requests.
          </p>
        </div>

        <button
          type="button"
          onClick={createDispatch}
          className="flex items-center gap-2 rounded-lg bg-[#FF6A00] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={18} />
          Create Dispatch
        </button>
      </header>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4">Dispatch</th>
              <th className="px-5 py-4">Client</th>
              <th className="px-5 py-4">Route</th>
              <th className="px-5 py-4">Driver</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Temperature</th>
            </tr>
          </thead>

          <tbody>
            {dispatches.map((dispatch) => (
              <tr
                key={dispatch.id}
                onClick={() =>
                  navigate(`/dispatch/${dispatch.id}`)
                }
                className="cursor-pointer border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-medium text-slate-900">
                  {dispatch.id}
                </td>

                <td className="px-5 py-4">
                  {dispatch.client}
                </td>

                <td className="px-5 py-4">
                  {dispatch.pickup}
                  <span className="mx-2 text-slate-400">
                    →
                  </span>
                  {dispatch.destination}
                </td>

                <td className="px-5 py-4">
                  {dispatch.driver ?? (
                    <span className="text-slate-400">
                      Unassigned
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[dispatch.status]
                    }`}
                  >
                    {dispatch.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  {dispatch.temperature !== null
                    ? `${dispatch.temperature.toFixed(1)}°F`
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}