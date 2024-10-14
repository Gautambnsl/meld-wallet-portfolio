import { ReactElement } from "react";

// ==============================|| AUTH TYPES  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  adminRole: {
    isActive: string;
    isDeleted: string;
    roleLevel: number;
    roleName: string;
  };
  createdAt: string;
  createdBy: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  notification: number;
  permission: any;
  profilePic: string;
  roleId: string;
  updatedAt: string;
  userId: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null;
  token?: any;
  currentProject?: any;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (oldPassword: string, new_password: string) => Promise<void>;
  updateProfile: (firstName: string, lastName: string) => Promise<void>;
};
