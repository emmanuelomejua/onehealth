// api/staff.ts
import SERVER from './server'; // your axios instance
import type { StaffMember, StaffOnboardingPayload, StaffOnboardingResponse } from '../types/staff';

export const listHospitalStaff = async (hospitalId: string): Promise<StaffMember[]> => {
  const { data } = await SERVER.get<{ status: boolean; message: string; data: StaffMember[] }>(
    `/hospitals/${hospitalId}/staff`
  );
  return data.data;
};

export const onboardStaff = async (
  hospitalId: string,
  payload: StaffOnboardingPayload
): Promise<StaffOnboardingResponse> => {
  const { data } = await SERVER.post<StaffOnboardingResponse>(
    `/hospitals/${hospitalId}/staff`,
    payload
  );
  return data;
};

// TODO: wire these up once the corresponding endpoints exist.
// export const changeStaffRole = async (hospitalId: string, staffId: string, role: StaffRole) => {...};
// export const setStaffStatus = async (hospitalId: string, staffId: string, active: boolean) => {...};
// export const removeStaff = async (hospitalId: string, staffId: string) => {...};
