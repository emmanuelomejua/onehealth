import { useMemo, useState } from 'react';
import { Building2, Eye, Search, ShieldCheck } from 'lucide-react';
import { initials } from '../../helpers/funcs';
import Typography from '../../components/primitives/Typography';
import { Link } from 'react-router-dom';

type VerificationStatus = 'verified' | 'pending' | 'rejected';

interface Hospital {
  id: string;
  name: string;
  verification_status: VerificationStatus;
}

// Mock data shaped exactly like the /hospitals directory response.
// Swap this out for the real fetch once the endpoint is ready.
const MOCK_HOSPITALS: Hospital[] = [
  { id: '850e8400-e29b-41d4-a716-446655440000', name: 'Central Medical Hospital', verification_status: 'verified' },
  { id: '9c6a2f10-3b7e-4d2a-9f1c-2a7b8e5d1f34', name: 'Lagoon Hospital', verification_status: 'verified' },
  { id: '1e4d9a2b-6c3f-4a8e-b2d7-5f9c1e3a7b60', name: 'Reddington Hospital', verification_status: 'verified' },
  { id: 'c7f3b8e1-2d4a-4f6b-8e9c-3a1d7f2b5c90', name: 'St. Nicholas Hospital', verification_status: 'verified' },
  { id: '4a8e1f2b-9c3d-4e7a-b1f6-2c5d8a3e9f10', name: 'Eko Hospital', verification_status: 'verified' },
  { id: 'b1d5f8a3-4e2c-4b9f-9a7d-1f3e6c8b2d40', name: 'First Cardiology Consultants', verification_status: 'verified' },
];


const avatarTints = ['bg-primary/10 text-primary', 'bg-blue text-ink'];

export default function HospitalDirectory() {
  const [query, setQuery] = useState('');

  const hospitals = useMemo(
    () =>
      MOCK_HOSPITALS.filter((h) => h.verification_status === 'verified').filter((h) =>
        h.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  return (
    <div className="min-h-screen bg-canvas px-6 py-10 w-full">

        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">Directory</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Verified hospitals</h1>
        <p className="mt-1 text-sm text-body">
          Hospitals that have passed identity and license verification on OneHealth.
        </p>

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by hospital name"
            className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
          />
        </div>

        <p className="mt-4 text-[13px] text-subtle">
          {hospitals.length} {hospitals.length === 1 ? 'hospital' : 'hospitals'}
        </p>

        <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-white w-full">
          {hospitals.map((hospital, i) => (
            <li key={hospital.id} className="flex items-center gap-4 px-5 py-4 flex-1">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  avatarTints[i % avatarTints.length]
                }`}
              >
                {initials(hospital.name) || <Building2 className="h-5 w-5" />}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{hospital.name}</p>
                <p className="truncate text-[12px] text-subtle">ID: {hospital.id}</p>
              </div>

              <span className="tag inline-flex shrink-0 items-center gap-1 !border-success/20 !bg-green !text-success">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                Verified
              </span>

              <Link to={hospital.id} className="flex items-center gap-2.5">
                <Typography variant='small'>View</Typography>
                <Eye size={17}/>
              </Link>
            </li>
          ))}

          {hospitals.length === 0 && (
            <li className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-ink">No hospitals match "{query}"</p>
              <p className="mt-1 text-[13px] text-subtle">Try a different spelling or search term.</p>
            </li>
          )}
        </ul>
      {/* </div> */}
    </div>
  );
}
