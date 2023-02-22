import jwt_decode from "jwt-decode";
import { User } from "../Interfaces";
import { api } from "../service/axios";
import useErrors from "../hook/useErrors";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import React, { createContext, useEffect, useState } from "react";
import {
  IAuthContextRepository,
  SignInData,
} from "./repositories/IAuthContextRepository";

export const AuthContext = createContext({} as IAuthContextRepository);

export function AuthProvider({ children }: any) {
  // Informações do usuário
  const [authUser, setAuthUser] = useState<User | null>(null);
  const { errors, removeError, setError } = useErrors();

  useEffect(() => {
    recoveryUser();
  }, []);

  const isAuthenticated = !!authUser;

  async function recoveryUser() {
    const { "auth.token": token } = parseCookies();

    if (token) {
      api
        .get("/auth/recoveryUser", {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((response) => {
          setAuthUser(response.data);
        });
    }
  }

  async function signIn({ email, password }: SignInData) {
    console.timeLog(email, password);
    /*    if (!email || !password) {
      const errorBody = {
        field: "Fields required",
        message: "All fields required",
      };
      setError(errorBody);
      setTimeout(() => removeError("Fields required"), 2000);
      return;
    }

    const data = await api.post("/auth/login", {
      email,
      password,
    });

    const token = data.data.token;
    const error = data.data.message && data.data;

    if (token) {
      const decoded: any = jwt_decode(token);
      setAuthUser(decoded.user);
      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      window.location.reload();
    } else if (error) {
      const errorBody = {
        field: error.status,
        message: error.message,
      };
      setError(errorBody);
      setTimeout(() => removeError(error.status), 2000);
    } */
  }

  async function signUp({ email, username, password }: SignInData) {
    console.timeLog(email, password, username);
    /*   if (!email || !password || !username) {
      const errorBody = {
        field: "Fields required",
        message: "All fields required",
      };
      setError(errorBody);
      setTimeout(() => removeError("Fields required"), 2000);
      return;
    }

    const data = await api.post("/auth/register", {
      email,
      username,
      password,
    });

    const token = data.data.token;
    const error = data.data.message && data.data;

    if (token) {
      const decoded: any = jwt_decode(token);
      setAuthUser(decoded.user);
      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      window.location.reload();
    } else if (error) {
      const errorBody = {
        field: error.status,
        message: error.message,
      };
      setError(errorBody);
      setTimeout(() => removeError(error.status), 2000);
    } */
  }

  async function signOut() {
    destroyCookie(null, "auth.token");
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        recoveryUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
