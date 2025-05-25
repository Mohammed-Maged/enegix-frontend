import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.fetchAndCacheUsers,
    staleTime: 60_000,
  });
};
