import { createContext, PropsWithChildren, useContext, useState } from "react";
import httpModule from "../helpers/http.module";

type User = {
  username: string;
  jwtToken: string;
};

type UserContext = {
  user: User;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const JwtContext = createContext<UserContext>({} as UserContext);

type JwtProviderProps = PropsWithChildren;

export default function JwtProvider({ children }: JwtProviderProps) {
  const [user, setUser] = useState<User>(() => {
    let userStored = sessionStorage.getItem("User");
    if (userStored === "" || userStored === null) {
      return {} as User;
    }
    return JSON.parse(userStored);
  });

  const login = async (username: string, password: string) => {
    await httpModule
      .post("SignInSignOut/Login", { username, password, rememberMe: false })
      .then((response) => {
        setUser({ username: username, jwtToken: response.data });
        sessionStorage.setItem("User", JSON.stringify(user));
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    setUser({} as User);
    sessionStorage.removeItem("User");
  };

  return (
    <JwtContext.Provider value={{ user, login, logout }}>
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
