import type { HospitalRegistrationPayload, HospitalRegistrationResponse, PatientOnboardingPayload, PatientOnboardingResponse, StaffMember, StaffOnboardingPayload, StaffOnboardingResponse } from "../../types/types";
import SERVER from "../server";

export const registerPatient = async (
  payload: PatientOnboardingPayload
): Promise<PatientOnboardingResponse> => {
  const { data } = await SERVER.post<PatientOnboardingResponse>(
    '/register/hospital',
    payload
  );
  return data;
};

export const registerHospital = async (
  payload: HospitalRegistrationPayload
): Promise<HospitalRegistrationResponse> => {
  const { data } = await SERVER.post<HospitalRegistrationResponse>(
    '/auth/register/hospital/',
    payload
  );
  return data;
};

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
