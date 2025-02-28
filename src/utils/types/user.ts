export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type AuthResult = {
  accessToken: string;
  userId: number;
  userName: string;
};

export type UserLogin = { userName: string; password: string };
