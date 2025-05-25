import { STORE_NAMES } from "../constants/db";
import type { CachedUser, User } from "../types/user";
import { getDb } from "./db";

export const saveUserToIndexedDB = async (user: User) => {
  const db = await getDb();
  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");

  const adaptedUser: CachedUser = {
    id: user.id,
    username: user.username,
    password: user.password,
    firstName,
    lastName,
    email: user.email,
  };

  await db.put(STORE_NAMES.USERS, adaptedUser);
};

export const getUsersFromIndexedDB = async (): Promise<User[]> => {
  const db = await getDb();
  return await db.getAll(STORE_NAMES.USERS);
};

export const clearUsersFromIndexedDB = async () => {
  const db = await getDb();
  await db.clear(STORE_NAMES.USERS);
};
