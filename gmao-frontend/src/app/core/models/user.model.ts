export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: Role;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
