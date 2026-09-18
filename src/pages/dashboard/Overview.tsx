import React, { useState } from 'react';
import { badgeToneClasses } from '../../helpers/funcs';
import type { AuditLogEntry, PatientInfo } from '../../types/types';
import { vitalStats } from '../../data/data';
import Button from '../../components/primitives/buttons/Button';
import AddRecordModal from '../../modals/AddRecordModal';

// ---------- Icons (inline, no external deps) ----------
const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 15 15 9" />
    <path d="M10 6h6a4 4 0 0 1 0 8h-2" />
    <path d="M14 18H8a4 4 0 0 1 0-8h2" />
  </svg>
);

// const QrIcon = () => (
//   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="3" width="7" height="7" />
//     <rect x="14" y="3" width="7" height="7" />
//     <rect x="3" y="14" width="7" height="7" />
//     <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" />
//   </svg>
// );

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 5h16M7 12h10M10 19h4" />
  </svg>
);

const ExportIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15V3M7 8l5-5 5 5" />
    <path d="M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

const BlockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="m5.5 5.5 13 13" />
  </svg>
);

// ---------- Mock data (replace with real data from your API) ----------

const patient: PatientInfo = {
  name: 'Amina Bello',
  dob: 'Oct 14, 1982',
  age: 41,
  bloodType: 'O+',
  vaultAddress: 'onehealth://vault/amina.bello.eth',
  blockNumber: '#18,492,031',
};



const auditLog: AuditLogEntry[] = [
  {
    id: '1',
    initials: 'DR',
    accessor: 'Dr. Robert Chen, MD',
    provider: 'St. Jude Endocrinology',
    recordAccessed: 'Full Metabolic Panel & HbA1c',
    timestamp: 'Today, 14:22 EST',
    tokenStatus: { text: 'Active (Exp. 3h 45m)', tone: 'active' },
    action: 'revoke',
  },
  {
    id: '2',
    initials: 'MH',
    accessor: 'Metro Health ER',
    provider: 'Emergency Access Protocol',
    recordAccessed: 'Emergency Medical Profile & Allergies',
    timestamp: 'Yesterday, 02:15 EST',
    tokenStatus: { text: 'Expired', tone: 'expired' },
    action: 'closed',
  },
  {
    id: '3',
    initials: 'SN',
    accessor: 'Sarah Jenkins, NP',
    provider: 'Primary Care Network',
    recordAccessed: 'Vitals & Immunization Record',
    timestamp: 'Oct 24, 2023',
    tokenStatus: { text: 'Expired', tone: 'expired' },
    action: 'closed',
  },
];


// ---------- Component ----------

const Overview: React.FC = () => {

  const [addRecords, setAddRecords] = useState(false);


  const handleRevoke = (entry: AuditLogEntry) => {
    // Wire this up to your revoke-access endpoint
    console.log('Revoking access for', entry.accessor);
  };

  return (
    <div className="bg-[#eef4f1] text-[#16211d] font-sans">
      <main className="mx-auto flex flex-col gap-6 px-8 py-7">
        {/* Patient summary card */}
        <section className="flex flex-wrap items-start justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-teal-100 font-bold text-teal-900">
              {patient.photoUrl ? (
                <img src={patient.photoUrl} alt={patient.name} className="h-full w-full object-cover" />
              ) : (
                <span>{patient.name.split(' ').map((n) => n[0]).join('')}</span>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-lg font-bold">{patient.name}</span>
                <span className="rounded-full bg-[#eef4f1] px-2.5 py-1 text-xs">
                  DOB: {patient.dob} ({patient.age} yrs)
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Blood Type: {patient.bloodType}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                <span className="text-[13px] text-gray-500">Primary Care Vault:</span>
                <code className="rounded-md bg-[#eef4f1] px-2 py-0.5 font-mono text-xs text-teal-900">
                  {patient.vaultAddress}
                </code>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <LockIcon /> Zero-Knowledge Proofs Active
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <LinkIcon /> Block {patient.blockNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 gap-3">
            {/* <Button
              type="button"
              startIcon={<QrIcon /> }
              className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold hover:bg-[#eef4f1]"
            >
              Share Access Token
            </Button> */}
            <Button
              type="button"
              endIcon={<PlusIcon /> }
              onClick={() => setAddRecords(true)}
              className="rounded-[10px] bg-teal-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-teal-950"
            >
              Add Record
            </Button>
          </div>
        </section>

        {/* Stat cards */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {vitalStats.map((stat) => (
            <div key={stat.id} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#eef4f1] text-teal-900">
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.sublabel}</div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    badgeToneClasses[stat.badge.tone]
                  }`}
                >
                  {stat.badge.text}
                </span>
              </div>

              <div className="text-[26px] font-bold leading-tight">
                {stat.value}
                {stat.unit && <span className="text-sm font-medium text-gray-500"> {stat.unit}</span>}
              </div>
              <div
                className={`mt-1.5 text-[13px] ${
                  stat.metaTone === 'success' ? 'font-semibold text-emerald-700' : 'text-gray-500'
                }`}
              >
                {stat.detail}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3.5">
                <span className="text-[13px] text-gray-500">{stat.meta}</span>
                <a href="#" className="text-[13px] font-semibold text-teal-900 hover:underline">
                  {stat.linkText}›
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* Audit log */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold">Active Access Audit Log</h2>
                <span className="rounded-full bg-teal-100 px-2.5 py-1 text-[11px] font-semibold text-teal-900">
                  Real-time
                </span>
              </div>
              <p className="mt-1.5 max-w-[520px] text-[13px] text-gray-500">
                Immutable ledger tracking who viewed your records and time-limited token statuses.
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold hover:bg-[#eef4f1]"
              >
                <FilterIcon /> Filter
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold hover:bg-[#eef4f1]"
              >
                <ExportIcon /> Export Log
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Accessor / Provider
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Record Accessed
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Timestamp
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Token Status
                  </th>
                  <th className="border-b border-gray-200 px-3 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border-b border-gray-200 px-3 py-4 text-[13px] last:border-b-0">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[11px] font-bold text-teal-900">
                          {entry.initials}
                        </div>
                        <div>
                          <div className="font-semibold">{entry.accessor}</div>
                          <div className="text-xs text-gray-500">{entry.provider}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 px-3 py-4 text-[13px]">{entry.recordAccessed}</td>
                    <td className="border-b border-gray-200 px-3 py-4 font-mono text-xs text-gray-500">
                      {entry.timestamp}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          badgeToneClasses[entry.tokenStatus.tone]
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {entry.tokenStatus.text}
                      </span>
                    </td>
                    <td className="border-b border-gray-200 px-3 py-4 text-right">
                      {entry.action === 'revoke' ? (
                        <button
                          type="button"
                          onClick={() => handleRevoke(entry)}
                          aria-label={`Revoke access for ${entry.accessor}`}
                          className="ml-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-200 bg-white text-[#b3452c] hover:bg-red-50"
                        >
                          <BlockIcon />
                        </button>
                      ) : (
                        <span className="text-[13px] text-gray-500">Closed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4.5 flex flex-wrap items-center justify-between gap-2.5 border-t border-gray-200 pt-4">
            <span className="text-[13px] text-gray-500">
              Showing {auditLog.length} of 42 historical access events recorded on-chain.
            </span>
            <a href="#" className="text-[13px] font-semibold text-teal-900 hover:underline">
              View Complete Blockchain Ledger →
            </a>
          </div>
        </section>
      </main>

      <AddRecordModal open={addRecords} setOpen={setAddRecords}/>
    </div>
  );
};

export default Overview;
