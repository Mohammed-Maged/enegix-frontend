import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth";
import type { LoginPayload } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { SanitisedUser } from "../types/user";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (response) => {
      const { id, username, name, email } = response.data.data || {};
      const sanitisedUser: SanitisedUser = { id, username, name, email };
      setUser(sanitisedUser);
      navigate("/dashboard");
    },
  });
};
