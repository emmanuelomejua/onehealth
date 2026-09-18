import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { HospitalRegistrationPayload, HospitalRegistrationResponse, StaffMember, StaffOnboardingPayload, StaffOnboardingResponse } from "../types/types";
import { listHospitalStaff, onboardStaff, registerHospital } from "../lib/api/hospitals";
import { toast } from "sonner";

export const useHospitalRegistration = () => {
  return useMutation<HospitalRegistrationResponse, AxiosError, HospitalRegistrationPayload>({
    mutationFn: registerHospital,
    onSuccess: (data) => {
      toast.success("Hospital registered successfully!");
      return data;
    },
    onError: (error) => {
      const message =
        (error.response?.data as any)?.message ?? 'Registration failed. Please try again.';
      toast.error(message);
      console.error(message);
    },
  });
};


export const staffQueryKey = (hospitalId: string) => ['hospital-staff', hospitalId];

export const useHospitalStaff = (hospitalId: string) => {
  return useQuery<StaffMember[], AxiosError>({
    queryKey: staffQueryKey(hospitalId),
    queryFn: () => listHospitalStaff(hospitalId),
    enabled: !!hospitalId,
  });
};

export const useStaffOnboarding = (hospitalId: string) => {
  const queryClient = useQueryClient();

  return useMutation<StaffOnboardingResponse, AxiosError, StaffOnboardingPayload>({
    mutationFn: (payload) => onboardStaff(hospitalId, payload),
    onSuccess: () => {
      // Refresh the staff list so the new hire shows up immediately.
      queryClient.invalidateQueries({ queryKey: staffQueryKey(hospitalId) });
    },
  });
};
