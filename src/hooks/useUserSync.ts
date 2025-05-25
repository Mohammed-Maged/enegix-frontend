import { useSync } from "../context/SyncContext";
import { userService } from "../services/user";

export const useUserSync = () => {
  const { startSync, stopSync } = useSync();

  const sync = async () => {
    try {
      startSync();
      await userService.syncUsersWithPagination();
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      stopSync();
    }
  };

  return { sync };
};
