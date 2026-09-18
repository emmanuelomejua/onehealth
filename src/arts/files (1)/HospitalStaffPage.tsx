// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Briefcase,
//   IdCard,
//   Mail,
//   MoreVertical,
//   Plus,
//   ShieldOff,
//   Trash2,
//   User,
//   UserCog,
//   X,
// } from 'lucide-react';
// import { useHospitalStaff, useStaffOnboarding } from '../hooks/useHospitalStaff';
// import type { StaffMember, StaffOnboardingPayload, StaffRole } from '../types/staff';

// const roleOptions: { value: StaffRole; label: string }[] = [
//   { value: 'doctor', label: 'Doctor' },
//   { value: 'nurse', label: 'Nurse' },
//   { value: 'lab_technician', label: 'Lab technician' },
//   { value: 'pharmacist', label: 'Pharmacist' },
//   { value: 'receptionist', label: 'Receptionist' },
//   { value: 'admin', label: 'Admin' },
// ];

// const roleLabel = (role: StaffRole) => roleOptions.find((r) => r.value === role)?.label ?? role;

// function initials(name: string) {
//   return name
//     .split(' ')
//     .filter((w) => /^[A-Za-z]/.test(w))
//     .slice(0, 2)
//     .map((w) => w[0])
//     .join('')
//     .toUpperCase();
// }

// export default function HospitalStaffPage() {
//   const { hospitalId = '' } = useParams<{ hospitalId: string }>();
//   const { data: staff, isLoading, isError } = useHospitalStaff(hospitalId);

//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
//   const [viewStaff, setViewStaff] = useState<StaffMember | null>(null);
//   const [showOnboard, setShowOnboard] = useState(false);

//   // TODO: replace with real mutations once change-role / deactivate / remove
//   // endpoints exist. For now these just close the menu.
//   const handleStubAction = (label: string, member: StaffMember) => {
//     console.log(`${label}:`, member.id);
//     setOpenMenuId(null);
//   };

//   return (
//     <div className="min-h-screen bg-canvas px-6 py-10">
//       <div className="mx-auto max-w-[720px]">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
//               Hospital staff
//             </p>
//             <h1 className="mt-2 text-2xl font-bold text-ink">Manage staff</h1>
//             <p className="mt-1 text-sm text-body">
//               Everyone with access to this hospital's records and scheduling.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => setShowOnboard(true)}
//             className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
//           >
//             <Plus className="h-4 w-4" />
//             Onboard staff
//           </button>
//         </div>

//         {isLoading && (
//           <p className="mt-8 text-sm text-subtle">Loading staff…</p>
//         )}

//         {isError && (
//           <div className="mt-8 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700">
//             Couldn't load staff for this hospital. Please try again.
//           </div>
//         )}

//         {!isLoading && !isError && (
//           <ul className="mt-6 divide-y divide-line rounded-xl border border-line bg-white">
//             {staff?.map((member) => (
//               <li key={member.id} className="flex items-center gap-4 px-5 py-4">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
//                   {initials(member.full_name) || <User className="h-5 w-5" />}
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-sm font-semibold text-ink">{member.full_name}</p>
//                   <span className="tag mt-1">{roleLabel(member.role)}</span>
//                 </div>

//                 <div className="relative shrink-0">
//                   <button
//                     type="button"
//                     onClick={() => setOpenMenuId((id) => (id === member.id ? null : member.id))}
//                     aria-label="Staff actions"
//                     className="flex h-9 w-9 items-center justify-center rounded-lg text-subtle hover:bg-muted hover:text-ink"
//                   >
//                     <MoreVertical className="h-4.5 w-4.5" />
//                   </button>

//                   {openMenuId === member.id && (
//                     <>
//                       <button
//                         type="button"
//                         aria-label="Close menu"
//                         onClick={() => setOpenMenuId(null)}
//                         className="fixed inset-0 z-10 cursor-default"
//                       />
//                       <div className="absolute right-0 top-11 z-20 w-52 overflow-hidden rounded-lg border border-line bg-white py-1 shadow-md">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setViewStaff(member);
//                             setOpenMenuId(null);
//                           }}
//                           className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-body hover:bg-muted"
//                         >
//                           <User className="h-4 w-4 text-subtle" />
//                           View details
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => handleStubAction('Change role', member)}
//                           className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-body hover:bg-muted"
//                         >
//                           <UserCog className="h-4 w-4 text-subtle" />
//                           Change role
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => handleStubAction('Deactivate', member)}
//                           className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-body hover:bg-muted"
//                         >
//                           <ShieldOff className="h-4 w-4 text-subtle" />
//                           Deactivate / suspend
//                         </button>
//                         <div className="my-1 border-t border-line" />
//                         <button
//                           type="button"
//                           onClick={() => handleStubAction('Remove', member)}
//                           className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                           Remove from hospital
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </li>
//             ))}

//             {staff?.length === 0 && (
//               <li className="px-5 py-10 text-center">
//                 <p className="text-sm font-medium text-ink">No staff yet</p>
//                 <p className="mt-1 text-[13px] text-subtle">
//                   Onboard your first team member to get started.
//                 </p>
//               </li>
//             )}
//           </ul>
//         )}
//       </div>

//       {viewStaff && <StaffDetailsModal member={viewStaff} onClose={() => setViewStaff(null)} />}
//       {showOnboard && (
//         <OnboardStaffModal hospitalId={hospitalId} onClose={() => setShowOnboard(false)} />
//       )}
//     </div>
//   );
// }

// function ModalShell({
//   title,
//   onClose,
//   children,
// }: {
//   title: string;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/40 px-4">
//       <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-lg">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-bold text-ink">{title}</h2>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close"
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-muted hover:text-ink"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

// function StaffDetailsModal({ member, onClose }: { member: StaffMember; onClose: () => void }) {
//   return (
//     <ModalShell title="Staff details" onClose={onClose}>
//       <div className="mt-5 space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
//             {initials(member.full_name)}
//           </div>
//           <div>
//             <p className="text-sm font-semibold text-ink">{member.full_name}</p>
//             <span className="tag mt-1">{roleLabel(member.role)}</span>
//           </div>
//         </div>
//         <div className="rounded-lg border border-line bg-muted px-4 py-3 text-[12px] text-subtle">
//           ID: {member.id}
//         </div>
//       </div>
//     </ModalShell>
//   );
// }

// function OnboardStaffModal({ hospitalId, onClose }: { hospitalId: string; onClose: () => void }) {
//   const { mutate, isPending, isError, error } = useStaffOnboarding(hospitalId);

//   const [form, setForm] = useState<StaffOnboardingPayload>({
//     email: '',
//     full_name: '',
//     role: 'doctor',
//     professional_license_number: '',
//   });

//   const update =
//     (field: keyof StaffOnboardingPayload) =>
//     (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
//       setForm((prev) => ({ ...prev, [field]: e.target.value }));

//   const apiMessage = (error as any)?.response?.data?.message;

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     mutate(form, { onSuccess: onClose });
//   };

//   return (
//     <ModalShell title="Onboard staff" onClose={onClose}>
//       <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
//         {isError && (
//           <div className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-red-700">
//             {apiMessage ?? 'Could not onboard this staff member. Please try again.'}
//           </div>
//         )}

//         <div className="relative">
//           <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
//           <input
//             type="text"
//             required
//             placeholder="Full name"
//             value={form.full_name}
//             onChange={update('full_name')}
//             className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
//           />
//         </div>

//         <div className="relative">
//           <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
//           <input
//             type="email"
//             required
//             placeholder="Email address"
//             value={form.email}
//             onChange={update('email')}
//             className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div className="relative">
//             <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
//             <select
//               value={form.role}
//               onChange={update('role')}
//               className="w-full appearance-none rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
//             >
//               {roleOptions.map((r) => (
//                 <option key={r.value} value={r.value}>
//                   {r.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="relative">
//             <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
//             <input
//               type="text"
//               required
//               placeholder="License no."
//               value={form.professional_license_number}
//               onChange={update('professional_license_number')}
//               className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isPending}
//           className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {isPending ? 'Onboarding…' : 'Onboard staff'}
//         </button>
//       </form>
//     </ModalShell>
//   );
// }
