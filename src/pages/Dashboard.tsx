import {
  AlertTriangle,
  Clock,
  Truck,
  Users,
} from 'lucide-react';

const stats = [
  {
    label: 'Active Jobs',
    value: 4,
    icon: Truck,
  },
  {
    label: 'Drivers Available',
    value: 6,
    icon: Users,
  },
  {
    label: 'Pending Dispatches',
    value: 2,
    icon: Clock,
  },
  {
    label: 'Alerts',
    value: 1,
    icon: AlertTriangle,
  },
];

export default function Dashboard() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm text-slate-500">
          Apex Medical OC
        </p>

        <h2 className="text-3xl font-semibold text-slate-900">
          Operations Dashboard
        </h2>

        <p className="mt-2 text-slate-500">
          Current clinical logistics activity.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-3">
                  <Icon
                    size={22}
                    className="text-slate-700"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Current Operations
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Recent dispatch activity
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Dispatch</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Driver</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Temperature</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-4 font-medium">
                  APX-1024
                </td>

                <td className="px-4 py-4">
                  Pacific Diagnostics
                </td>

                <td className="px-4 py-4">
                  Daniel Carter
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    In Transit
                  </span>
                </td>

                <td className="px-4 py-4">
                  38.6°F
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}