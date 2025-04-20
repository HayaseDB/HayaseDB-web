export interface User {
  id: string;
  username: string;
  email?: string;
  verified?: boolean;
  role?: string;
  banned?: boolean;
  createdAt?: any;
  updatedAt?: any;
  pfp?: {
    url: string;
    createdAt: string;
    id: string;
  };
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}
