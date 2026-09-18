// // hooks/useHospitalStaff.ts
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { AxiosError } from 'axios';
// import { listHospitalStaff, onboardStaff } from '../api/staff';
// import type { StaffMember, StaffOnboardingPayload, StaffOnboardingResponse } from '../types/staff';

// export const staffQueryKey = (hospitalId: string) => ['hospital-staff', hospitalId];

// export const useHospitalStaff = (hospitalId: string) => {
//   return useQuery<StaffMember[], AxiosError>({
//     queryKey: staffQueryKey(hospitalId),
//     queryFn: () => listHospitalStaff(hospitalId),
//     enabled: !!hospitalId,
//   });
// };

// export const useStaffOnboarding = (hospitalId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation<StaffOnboardingResponse, AxiosError, StaffOnboardingPayload>({
//     mutationFn: (payload) => onboardStaff(hospitalId, payload),
//     onSuccess: () => {
//       // Refresh the staff list so the new hire shows up immediately.
//       queryClient.invalidateQueries({ queryKey: staffQueryKey(hospitalId) });
//     },
//   });
// };
