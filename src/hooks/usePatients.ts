import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { AddRecordPayload, MedicalRecord, PatientOnboardingPayload, PatientOnboardingResponse } from '../types/types';
import { registerPatient } from '../lib/api/hospitals';
import { addMedicalRecord } from '../lib/api/patients';

export const usePatientOnboarding = () => {
  return useMutation<PatientOnboardingResponse, AxiosError, PatientOnboardingPayload>({
    mutationFn: registerPatient,
    onSuccess: (data) => {
      // e.g. redirect to login, or auto sign-in, or show a success toast
      console.log('Patient registered:', data);
    },
    onError: (error) => {
      // surface API error message if your backend returns one
      const message =
        (error.response?.data as any)?.message ?? 'Registration failed. Please try again.';
      console.error(message);
    },
  });
};

export const medicalRecordsQueryKey = ['medical-records', 'me'];

export const useAddMedicalRecord = () => {
  const queryClient = useQueryClient();

  return useMutation<MedicalRecord, AxiosError, AddRecordPayload>({
    mutationFn: addMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicalRecordsQueryKey });
    },
  });
};
