import {
  Activity,
  Building2,
  LayoutDashboard,
  Truck,
  UserRound,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
  label: 'Driver View',
  path: '/driver',
  icon: UserRound,
},
  {
  label: 'Client View',
  path: '/client',
  icon: Building2,
},
  {
    label: 'Dispatch',
    path: '/dispatch',
    icon: Truck,
  },
  {
    label: 'Active Pulse',
    path: '/active-pulse',
    icon: Activity,
  },
];

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-[#22262C] text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-xl font-semibold">
          Apex OS
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Demonstration Environment
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm',
                  isActive
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-slate-300 hover:bg-slate-800',
                ].join(' ')
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}