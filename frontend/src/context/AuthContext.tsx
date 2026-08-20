'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { DEMO_USER } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isDemoMode: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  toggleDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [role, setRoleState] = useState<UserRole>('farmer');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('agri_token');
    const savedUser = localStorage.getItem('agri_user');
    const savedDemo = localStorage.getItem('agri_demo');

    if (savedUser && !savedDemo) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setRoleState(parsed.role || 'farmer');
        setIsDemoMode(false);
      } catch (e) {
        setUser(DEMO_USER);
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('agri_token', token);
    localStorage.setItem('agri_user', JSON.stringify(userData));
    localStorage.removeItem('agri_demo');
    setUser(userData);
    setRoleState(userData.role);
    setIsDemoMode(false);
  };

  const logout = () => {
    localStorage.removeItem('agri_token');
    localStorage.removeItem('agri_user');
    setUser(null);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const toggleDemoMode = () => {
    const nextDemo = !isDemoMode;
    setIsDemoMode(nextDemo);
    if (nextDemo) {
      localStorage.setItem('agri_demo', 'true');
      setUser(DEMO_USER);
      setRoleState('farmer');
    } else {
      localStorage.removeItem('agri_demo');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isDemoMode, login, logout, setRole, toggleDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
