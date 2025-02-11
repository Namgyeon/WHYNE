"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/lib/api/user";

interface UserProps {
  email: string;
  nickname: string;
  image: string | null;
}

interface UserContextProps {
  isLoading: boolean;
  user?: UserProps;
  setUser: Dispatch<SetStateAction<UserProps | undefined>>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps>();
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (access || refresh || email) {
      fetchUserProfile()
        .then((data) => {
          const { nickname, image } = data;
          setUser({ email: email as string, nickname, image });
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(undefined);
    router.replace("/");
  };

  return (
    <UserContext.Provider value={{ isLoading, user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useAuth는 반드시 AuthProvider 노드 안에서 사용돼야 합니다."
    );
  }
  return context;
}
