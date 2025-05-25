import { fetchUsersApi, syncUsersApi } from "../api/user";
import { decryptWithDynamicKey } from "../utils/decryptGCM";
import { userRepository } from "../repositories/userRepository";
import type { User } from "../types/user";

export const userService = {
  async fetchAndCacheUsers(): Promise<User[]> {
    const response = await fetchUsersApi();
    const { d, n, t } = response;
    const decrypted = await decryptWithDynamicKey(d, n, t);
    const users: User[] = decrypted;

    await userRepository.cacheUsers(users);

    return users;
  },

  async syncUsersWithPagination(): Promise<void> {
    let totalFetched = 0;
    const maxUsers = 1000;
    const maxPages = 10;

    await userRepository.clearCache();
    const allUsers: User[] = [];

    for (let i = 0; i < maxPages; i++) {
      const { d, n, t } = await syncUsersApi();
      const decrypted = await decryptWithDynamicKey(d, n, t);
      const users: User[] = decrypted;

      if (users.length === 0) break;

      allUsers.push(...users);
      totalFetched += users.length;

      if (totalFetched >= maxUsers) break;
    }

    const finalUsers = allUsers.slice(0, maxUsers);
    await userRepository.cacheUsers(finalUsers);
  },

  async getCachedUsers(): Promise<User[]> {
    return await userRepository.getCachedUsers();
  },
};
