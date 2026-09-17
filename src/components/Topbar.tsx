import { BellIcon } from 'lucide-react';
import React, { useState } from 'react'


type NavItem = (typeof navItems)[number];

const navItems = ['Dashboard', 'Records', 'Access Permissions', 'Audit Log'] as const;

const Topbar = () => {

      const [activeTab, setActiveTab] = useState<NavItem>('Dashboard');

  return (
    <header className='flex items-center justify-between gap-6 px-8 py-3.5 bg-white border-b border-gray-200'>
           <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-teal-900 text-xs font-bold text-white">
            OH
          </div>
          <div>
            <div className="text-[15px] font-bold leading-tight">OneHealth</div>
            <div className="text-xs text-gray-500">Patient-Owned Encrypted Records</div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-[10px] bg-[#eef4f1] p-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveTab(item)}
              className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
                activeTab === item
                  ? 'bg-teal-900 text-white'
                  : 'text-[#16211d] hover:bg-white'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

                <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#16211d]"
          >
            <BellIcon />
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

  )
}

export default Topbar;
