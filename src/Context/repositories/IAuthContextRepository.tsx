import { User } from "../../Interfaces";

export interface SignInData {
  email: string;
  password: string;
  username: string;
}

export interface IAuthContextRepository {
  authUser: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignInData) => Promise<void>;
  signOut: () => void;
  recoveryUser: () => void;
  isAuthenticated: boolean;
  setAuthUser: any;
}
