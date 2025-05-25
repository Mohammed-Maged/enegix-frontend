import { axiosInstance } from "../utils/axiosInstance";
import type { LoginPayload } from "../types/auth";

export const loginApi = (payload: LoginPayload) => {
  const formData = new URLSearchParams();
  formData.append("username", payload.username);
  formData.append("password", payload.password);

  return axiosInstance.post("/login", formData);
};
