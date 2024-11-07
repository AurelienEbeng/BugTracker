import { createContext, PropsWithChildren, useContext, useState } from "react";
import httpModule from "../helpers/http.module";

type User = {
  username: string;
  jwtToken: string;
  id: string;
};

type UserContext = {
  user: User;
  login: (username: string, password: string) => void;
  loginDemoUser: (username: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const JwtContext = createContext<UserContext>({} as UserContext);

type JwtProviderProps = PropsWithChildren;

export default function JwtProvider({ children }: JwtProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const login = async (username: string, password: string) => {
    await httpModule
      .post("SignInSignOut/Login", { username, password, rememberMe: false })
      .then((response) => {
        setUser({
          username: username,
          jwtToken: response.data.tokenString,
          id: response.data.userId,
        });
      })
      .catch((error) => console.log(error));
  };

  const loginDemoUser = async (username: string) => {
    let params = new URLSearchParams();
    params.append("username",username);
    await httpModule
      .post("SignInSignOut/LoginDemoUser?"+params)
      .then((response) => {
        setUser({
          username: username,
          jwtToken: response.data.tokenString,
          id: response.data.userId,
        });
      })
      .catch((error) => console.log(error));
  };

  const logout = async () => {
    await httpModule
      .get("SignInSignOut/Logout", {
        headers: { Authorization: "Bearer " + user.jwtToken },
      })
      .catch((error) => console.log(error));
    setUser({} as User);
  };

  const isLoggedIn = () => {
    if (user.id === undefined || user.jwtToken === undefined) {
      return false;
    }
    return true;
  };

  return (
    <JwtContext.Provider value={{ user, login, logout, isLoggedIn, loginDemoUser }}>
      {children}
    </JwtContext.Provider>
  );
}

export const useJwt = () => {
  const context = useContext(JwtContext);

  if (context === undefined) {
    throw new Error("useJWT must be used within an JwtProvider");
  }

  return context;
};
