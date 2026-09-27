import apiClient from "@/lib/apiClient";

export function userLogin(payload: any) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}
