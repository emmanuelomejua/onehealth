import type { AddRecordPayload, MedicalRecord } from "../../types/types";
import SERVER from "../server";

export const addMedicalRecord = async (payload: AddRecordPayload): Promise<MedicalRecord> => {
  const { data } = await SERVER.post<MedicalRecord>('/patients/me/records', payload);
  return data;
};
