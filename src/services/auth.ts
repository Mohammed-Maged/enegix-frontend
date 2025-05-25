import bcrypt from "bcryptjs";
import { loginApi } from "../api/auth";
import { userRepository } from "../repositories/userRepository";
import type { LoginPayload } from "../types/auth";

export const authService = {
  login: async (payload: LoginPayload) => {
    try {
      const response = await loginApi(payload);
      return { success: true, data: response.data };
    } catch (error) {
      console.warn("Login failed, falling back to IndexedDB...");

      const cachedUsers = await userRepository.getCachedUsers();
      const matchedUser = cachedUsers.find(
        (user) => user.username === payload.username
      );

      if (!matchedUser) {
        throw new Error("No matching user found in IndexedDB");
      }

      const isPasswordCorrect = await bcrypt.compare(
        payload.password,
        matchedUser.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Invalid credentials (offline)");
      }

      return {
        success: true,
        data: matchedUser,
        offline: true,
      };
    }
  },
};