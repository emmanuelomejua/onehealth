import { useState } from 'react';
import {
  Calendar,
  Droplet,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  LockKeyhole,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { PatientOnboardingPayload } from '../../types/types';
import { usePatientOnboarding } from '../../hooks/usePatients';


type FormState = PatientOnboardingPayload
 & { confirmPassword: string };

const initialState: FormState = {
  email: '',
  password: '',
  confirmPassword: '',
  phone_number: '',
  full_name: '',
  date_of_birth: '',
  gender: 'male',
  blood_type: 'O+',
};

const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

const phonePattern = /^0\d{10}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!form.full_name.trim()) errors.full_name = 'Enter your full name.';

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!phonePattern.test(form.phone_number)) {
    errors.phone_number = 'Enter an 11-digit number starting with 0.';
  }

  if (!form.date_of_birth) {
    errors.date_of_birth = 'Enter your date of birth.';
  } else if (new Date(form.date_of_birth) > new Date()) {
    errors.date_of_birth = 'Date of birth cannot be in the future.';
  }

  if (!passwordPattern.test(form.password)) {
    errors.password = 'At least 8 characters, with upper, lower case and a number.';
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1.5 text-[12px] font-medium text-red-600">{message}</p> : null;

const inputBase =
  'w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40';

export default function PatientRegistrationForm() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = usePatientOnboarding();

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const { confirmPassword: _confirmPassword, ...payload } = form;
    mutate(payload, {
      onSuccess: () => navigate('/sign-in', { replace: true }),
    });
  };

  const apiMessage = (error as any)?.response?.data?.message;

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Trust panel */}
      <aside className="relative hidden w-[380px] shrink-0 flex-col justify-between bg-primary px-10 py-12 text-white lg:flex">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-bold">
            OH
          </div>
          <h1 className="mt-8 text-2xl font-bold leading-tight">
            Your records, kept private and in your control.
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Creating an account gives you one secure place to manage your health
            history and decide exactly who can see it.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-white/70" strokeWidth={1.8} />
            <p className="text-[13px] leading-5 text-white/75">
              Everything you enter here is encrypted end-to-end before it leaves your device.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-white/70" strokeWidth={1.8} />
            <p className="text-[13px] leading-5 text-white/75">
              Only authorized persons can view your records.
            </p>
          </div>
        </div>
      </aside>

      {/* Form */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-[440px]">
          <div className="mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
              OH
            </div>
          </div>

          <h2 className="text-xl font-bold text-ink">Create your account</h2>
          <p className="mt-1 text-sm text-subtle">
            Takes about two minutes. You can update these details any time.
          </p>

          {isError && (
            <div className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700">
              {apiMessage ?? 'We could not create your account. Please try again.'}
            </div>
          )}

          {/* Account */}
          <p className="mb-3 mt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
            Account
          </p>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={update('email')}
                  className={inputBase}
                  aria-invalid={!!errors.email}
                />
              </div>
              <FieldError message={errors.email} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={form.password}
                    onChange={update('password')}
                    className={`${inputBase} pr-9`}
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-body"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError message={errors.password} />
              </div>

              <div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    className={`${inputBase} pr-9`}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-body"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError message={errors.confirmPassword} />
              </div>
            </div>
          </div>

          {/* Identity */}
          <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
            Identity
          </p>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.full_name}
                  onChange={update('full_name')}
                  className={inputBase}
                  aria-invalid={!!errors.full_name}
                />
              </div>
              <FieldError message={errors.full_name} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone_number}
                    onChange={update('phone_number')}
                    className={inputBase}
                    aria-invalid={!!errors.phone_number}
                  />
                </div>
                <FieldError message={errors.phone_number} />
              </div>

              <div>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={update('date_of_birth')}
                    className={`${inputBase} text-body`}
                    aria-invalid={!!errors.date_of_birth}
                  />
                </div>
                <FieldError message={errors.date_of_birth} />
              </div>
            </div>
          </div>

          {/* Health basics */}
          <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
            Health basics
          </p>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.gender}
              onChange={update('gender')}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="relative">
              <Droplet className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
              <select
                value={form.blood_type}
                onChange={update('blood_type')}
                className="w-full appearance-none rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
              >
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-8 flex w-full items-center justify-center rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Creating your account…' : 'Create account'}
          </button>

          <p className="mt-5 text-center text-[13px] text-subtle">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/sign-in')}
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
