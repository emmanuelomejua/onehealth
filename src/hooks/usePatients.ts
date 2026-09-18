import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { PatientOnboardingPayload, PatientOnboardingResponse } from '../types/types';
import { registerPatient } from '../lib/api/hospitals';

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

