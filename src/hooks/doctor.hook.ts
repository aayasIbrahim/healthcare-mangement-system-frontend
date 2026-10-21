import {
  applyAsDoctor,
  approveDoctor,
  getAllDoctors,
  getAllPublicDoctors,
  verifyDoctorAccount,
} from "@/api";
import { DoctorParams, PublicDoctorParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}
export function useVerifyDoctorAccount() {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
}

export function useGetAllDoctors(params: DoctorParams) {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}

export function useSuspenseGetAllDoctors(params: DoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}

export function useApproveDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}
export function useGetAllPublicDoctors(params: PublicDoctorParams) {
  return useQuery({
    queryKey: ["doctor", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}
export function useSuspenseGetPublicDoctors(params: PublicDoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}
