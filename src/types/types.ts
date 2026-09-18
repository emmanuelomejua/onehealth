
export interface UIProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}


export interface PatientOnboardingPayload {
  email: string;
  password: string;
  phone_number: string;
  full_name: string;
  date_of_birth: string; // YYYY-MM-DD
  gender: 'male' | 'female' | 'other';
  blood_type: string;
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: any
}

export interface PatientOnboardingResponse extends ApiResponse {
  data: {
    id: string;
    email: string;
    full_name: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    blood_type: string;
  }
}


export interface HospitalRegistrationPayload {
  hospital_name: string;
  registration_number: string;
  phermc_number: string;
  cac_number: string;
  address: string;
  admin_email: string;
  admin_password: string;
  admin_full_name: string;
}

export interface HospitalRegistrationResponse {
  id: string;
  hospital_name: string;
  registration_number: string;
  phermc_number: string;
  cac_number: string;
  address: string;
  admin_email: string;
  admin_full_name: string;
  // adjust based on your actual API response shape
}

export type StaffRole =
  | 'doctor'
  | 'nurse'
  | 'lab_technician'
  | 'pharmacist'
  | 'receptionist'
  | 'admin';

export interface StaffMember {
  id: string;
  full_name: string;
  role: StaffRole;
}

export interface StaffOnboardingPayload {
  email: string;
  full_name: string;
  role: StaffRole;
  professional_license_number: string;
}

export interface StaffOnboardingResponse extends StaffMember {
  email: string;
  professional_license_number: string;
}
