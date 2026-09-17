import { BellIcon } from 'lucide-react';
import { TextField } from './primitives/inputs/TextFields';
// import { NavLink } from 'react-router-dom';

// const navItems = [
//   {
//     label: 'Dashboard',
//     href: '/',
//   },
//   {
//     label: 'Records',
//     href: '/records',
//   },
//   {
//     label: 'Access Permissions',
//     href: '/access-permissions',
//   },
//   {
//     label: 'Audit Log',
//     href: '/audit-logs',
//   },
// ] as const;

const Topbar = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 flex items-center justify-between gap-6 border-b border-gray-200 bg-white px-8 py-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-teal-900 text-xs font-bold text-white">
          OH
        </div>

        <div>
          <div className="text-[15px] font-bold leading-tight">
            OneHealth
          </div>

          <div className="text-xs text-gray-500">
            Patient-Owned Encrypted Records
          </div>
        </div>
      </div>

      <TextField placeholder='Search app...'/>

      {/* <nav className="hidden items-center gap-1 rounded-[10px] bg-[#eef4f1] p-1 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            // Prevent "/" from staying active on every route.
            end={item.href === '/'}
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
                isActive
                  ? 'text-teal-900 bg-white'
                  : 'text-[#16211d] hover:bg-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav> */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#16211d] transition-colors hover:bg-gray-50"
        >
          <BellIcon className="h-4 w-4" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-900">
          AB
        </div>

        <div>
          <div className="text-[13px] font-semibold">Amina Bello</div>
          <div className="text-[11px] text-gray-500">ID: 0x8F2...3A9</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;