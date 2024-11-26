"use client";

import React, { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
  session: any;
}

export const SessionContext =
  React.createContext<SessionProviderProps["session"]>(null);

const SessionProvider = ({ children, session }: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
