import { axiosInstance } from "../utils/axiosInstance";

export const fetchUsersApi = async () => {
  const res = await axiosInstance.get("/users");
  return res.data.data;
};

export const syncUsersApi = async () => {
  const res = await axiosInstance.get("/sync-users");
  return res.data.data;
};
