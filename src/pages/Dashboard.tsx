import { useEffect } from "react";
import SyncModal from "../components/SyncModal";
import { useSync } from "../context/SyncContext";
import { useUserSync } from "../hooks/useUserSync";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user";
import { useStoredUser } from "../hooks/useStoredUser";

const Dashboard = () => {
  const user = useStoredUser();
  const { data: users, isLoading } = useUsers();
  const { isSyncing } = useSync();
  const { sync } = useUserSync();

  useEffect(() => {
    sync();

    const interval = setInterval(sync, 60_000);

    const handleOnline = () => {
      console.log("Back online, syncing...");
      sync();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

      <div className="text-gray-700">
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
      <SyncModal visible={isSyncing} message="Syncing users, please wait..." />
      <h2 className="text-xl font-semibold mt-8 mb-4">User List</h2>

      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
