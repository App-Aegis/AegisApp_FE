import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define possible user roles (expandable in the future)
type UserRole = 'admin' | null;

// Define the shape of our AuthContext
type AuthContextType = {
  isLoggedIn: boolean;
  userRole: UserRole;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props type
type AuthProviderProps = {
  children: ReactNode;
};

// AuthProvider component wraps your app and provides auth state/functions
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Hardcoded admin login logic
  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'Admin12345678@') {
      setIsLoggedIn(true);
      setUserRole('admin');
      return true;
    }
    return false;
  };

  // Logout clears state
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ---
// Explanation:
// - AuthProvider: Wraps your app, provides login state and functions.
// - useAuth: Custom hook to access auth state/functions in any component.
// - login: Checks hardcoded admin credentials, sets state if correct.
// - logout: Clears login state.
// --- 