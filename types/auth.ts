export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface UserPayload {
  id: string;
  email: string;
  fullName: string;
  role: string;
}


export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;


