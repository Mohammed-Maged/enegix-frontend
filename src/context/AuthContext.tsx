import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { SanitisedUser } from "../types/user";
import { getStoredUser, removeStoredUser, storeUser } from "../utils/localStorage";

interface AuthContextType {
  user: SanitisedUser | null;
  setUser: (user: SanitisedUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SanitisedUser | null>(() => getStoredUser());

  useEffect(() => {
  if (user) {
    storeUser(user);
  } else {
    removeStoredUser();
  }
}, [user]);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
