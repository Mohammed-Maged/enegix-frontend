import { createContext, useContext, useState, useCallback } from "react";

interface SyncContextType {
  isSyncing: boolean;
  startSync: () => void;
  stopSync: () => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const SyncProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const startSync = useCallback(() => setIsSyncing(true), []);
  const stopSync = useCallback(() => setIsSyncing(false), []);

  return (
    <SyncContext.Provider value={{ isSyncing, startSync, stopSync }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = (): SyncContextType => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error("useSync must be used within a SyncProvider");
  }
  return context;
};
