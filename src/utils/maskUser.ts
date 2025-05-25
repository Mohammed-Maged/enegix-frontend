import type { User } from "../types/user";

export const maskUser = (user: User): User => {
  return {
    ...user,
    email: maskEmail(user.email),
    username: maskUsername(user.username),
    password: "********",
  };
};

const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!domain) return "****@***";
  return `${local[0]}***@${domain}`;
};

const maskUsername = (username: string): string => {
  if (username.length <= 2) return "*".repeat(username.length);
  return username[0] + "***" + username.slice(-1);
};
