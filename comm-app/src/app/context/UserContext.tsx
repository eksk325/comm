"use client";

import { useUser } from "@clerk/nextjs";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type UserContextType = {
  userId: string;
  userImg: string;
};

const UserContext = createContext<UserContextType>(
  undefined as unknown as UserContextType
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [userId, setUserId] = useState<string>("");
  const [userImg, setUserImg] = useState<string>("");

  useEffect(() => {
    const id = user ? user.id : "";
    setUserId(id);

    const img = user ? user.imageUrl : "";
    setUserImg(img);
  }, [user]);

  return (
    <UserContext.Provider value={{ userId, userImg }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }
  return context;
};
