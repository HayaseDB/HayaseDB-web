export interface User {
  userId: string;
  username: string;
  email?: string;
  role?: string;
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
