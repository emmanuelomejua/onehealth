import { useState } from 'react';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileClock,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    description: 'Overview and activity',
  },
  {
    label: 'Records',
    href: '/records',
    icon: ClipboardList,
    description: 'Manage health records',
  },
  {
    label: 'Access Permissions',
    href: '/access-permissions',
    icon: UsersRound,
    description: 'Control record access',
  },
  {
    label: 'Audit Log',
    href: '/audit-logs',
    icon: FileClock,
    description: 'Review account activity',
  },
];

const secondaryNavItems: NavItem[] = [
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
    description: 'Updates and requests',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Account preferences',
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  const renderNavigationItem = (item: NavItem) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.href}
        to={item.href}
        end={item.href === '/'}
        onClick={closeMobileSidebar}
        title={isCollapsed ? item.label : undefined}
        className={({ isActive }) =>
          [
            'group relative flex min-h-12 items-center rounded-xl px-3',
            'transition-all duration-200',
            isCollapsed ? 'justify-center' : 'gap-3',
            isActive
              ? 'bg-teal-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-teal-50 hover:text-teal-900',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span className="absolute -left-1 h-6 w-1 rounded-r-full bg-teal-300" />
            )}

            <Icon
              className={[
                'h-5 w-5 shrink-0',
                isActive
                  ? 'text-teal-100'
                  : 'text-slate-500 group-hover:text-teal-800',
              ].join(' ')}
              strokeWidth={1.8}
            />

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.label}</p>

                <p
                  className={[
                    'truncate text-[11px]',
                    isActive ? 'text-teal-100' : 'text-slate-400',
                  ].join(' ')}
                >
                  {item.description}
                </p>
              </div>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open navigation"
        className="z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white',
          'transition-all duration-300 ease-in-out',
          isCollapsed ? 'lg:w-20' : 'lg:w-72',
          'w-72',
          isMobileOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-4">
          <div
            className={[
              'flex items-center',
              isCollapsed ? 'lg:justify-center' : 'gap-3',
            ].join(' ')}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-900 text-sm font-bold text-white shadow-sm">
              OH
            </div>

            <div className={isCollapsed ? 'lg:hidden' : ''}>
              <h1 className="text-[15px] font-bold text-slate-900">
                OneHealth
              </h1>
              <p className="text-[10px] text-slate-500">
                Secure Health Records
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <div>
            {!isCollapsed && (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Main menu
              </p>
            )}

            <nav className="space-y-1">
              {navItems.map(renderNavigationItem)}
            </nav>
          </div>

          <div className="my-5 border-t border-slate-100" />

          <div>
            {!isCollapsed && (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Account
              </p>
            )}

            <nav className="space-y-1">
              {secondaryNavItems.map(renderNavigationItem)}
            </nav>
          </div>

          {/* Security summary */}
          {!isCollapsed && (
            <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-900 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                  Protected
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">
                Records secured
              </h3>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Your medical records are encrypted and access-controlled.
              </p>

              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-teal-800">
                <LockKeyhole className="h-3.5 w-3.5" />
                End-to-end encrypted
              </div>
            </div>
          )}
        </div>

        {/* User account */}
        <div className="border-t border-slate-100 p-3">
          <div
            className={[
              'flex items-center rounded-xl p-2',
              isCollapsed ? 'justify-center' : 'gap-3',
            ].join(' ')}
          >
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-900">
                AB
              </div>

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            {!isCollapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    Amina Bello
                  </p>
                  <p className="truncate text-[11px] text-slate-500">
                    ID: 0x8F2...3A9
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Log out"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Desktop collapse button */}
        <button
          type="button"
          onClick={() => setIsCollapsed((current) => !current)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-teal-900 lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
