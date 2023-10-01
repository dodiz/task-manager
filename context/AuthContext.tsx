"use client";

import { FC, PropsWithChildren, createContext, useMemo } from "react";
import { setCookie, getCookie } from "cookies-next";
import { v4 } from "uuid";

export const AuthContext = createContext({
  userId: "",
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const userId = useMemo(() => {
    const uuid = getCookie("uuid");
    if (uuid) return uuid;
    const newUuid = v4();
    setCookie("uuid", newUuid, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return newUuid;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
