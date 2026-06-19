import API, { setAxiosConfig } from "@/service/api";
import { postRefreshToken } from "@/service/auth/api";
import type { RefreshToken } from "@/service/auth/type";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface User {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  image: string;
}

interface Context {
  user: User | null;
  changeUser: (user: User | null) => void;
  logout: () => void;
}

const contextValue = {
  user: {
    accessToken: "",
    refreshToken: "",
    username: "",
    email: "",
    image: "",
  },
  changeUser: () => {},
  logout: () => {},
};

interface Props {
  children: ReactNode;
}

const TokenContext = createContext<Context>(contextValue);

export const TokenProvider = ({ children }: Readonly<Props>) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? (JSON.parse(storedUser) as User)
      : {
          accessToken: "",
          refreshToken: "",
          username: "",
          email: "",
          image: "",
        };
  });

    const refreshAuthToken = async () => {
      try {
        const payload = user?.refreshToken || "";
        const response = await postRefreshToken(payload);

        const { accessToken, refreshToken } = response as RefreshToken;
        return { accessToken, refreshToken };
      } catch (error) {
        console.error(error);
      }
    };

  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        const response = await refreshAuthToken();
        const nextUser = {
          accessToken: response?.accessToken || "",
          refreshToken: response?.refreshToken || "",
          username: user?.username || "",
          email: user?.email || "",
          image: user?.image || "",
        };
        changeUser(nextUser);
        setAxiosConfig(response?.accessToken || "");
        error.config.headers["Authorization"] =
          `Bearer ${response?.accessToken}`;
        return API(error.config);
      }
      return Promise.reject(error);
    },
  );

  const changeUser = useCallback((user: User | null) => {
    setUser(user);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  const logout = useCallback(() => {
    if (user) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }, [user]);

  const tokenContextValue = useMemo(
    () => ({
      user,
      changeUser,
      logout,
    }),
    [user, changeUser, logout],
  );

  useEffect(() => {
    if (user) {
      setAxiosConfig(user?.accessToken);
    }
  }, [user]);

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("Error, useToken must be use within TokenContext");
  }

  return context;
}
