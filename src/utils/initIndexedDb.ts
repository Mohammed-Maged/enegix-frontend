import { openDB } from "idb";
import { DB_NAME, DB_VERSION, STORE_NAMES } from "../constants/db";

export const initIndexedDB = async () => {
  await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAMES.USERS)) {
        db.createObjectStore(STORE_NAMES.USERS, { keyPath: "id" });
      }
    },
  });
};
