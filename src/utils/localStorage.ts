import type { SanitisedUser } from "../types/user";

const USER_KEY = "user";

export const storeUser = (user: SanitisedUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getStoredUser = (): SanitisedUser | null => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};


export const removeStoredUser = () => {
  localStorage.removeItem(USER_KEY);
};
