import {
  saveUserToIndexedDB,
  getUsersFromIndexedDB,
  clearUsersFromIndexedDB,
} from "../utils/indexedDb";
import type { User } from "../types/user";
import { maskUser } from "../utils/maskUser";

export const userRepository = {
  async cacheUsers(users: User[]) {
    await clearUsersFromIndexedDB();
    await Promise.all(users.map((user) => saveUserToIndexedDB(maskUser(user))));
  },

  async getCachedUsers(): Promise<User[]> {
    return await getUsersFromIndexedDB();
  },

  async clearCache() {
    await clearUsersFromIndexedDB();
  },
};
