import React, { useContext, useEffect, useMemo, useState } from "react";
import { User } from "../types";

type UserContextType = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  userIsSignedIn: boolean;
};

const userContextInitValue = {
  currentUser: { userId: "", email: "" },
  setCurrentUser: () => {},
  userIsSignedIn: false,
};

const UserContext = React.createContext<UserContextType>(userContextInitValue);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User>({
    userId: "",
    email: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");

    if (userId && email) {
      setCurrentUser({
        userId: JSON.parse(userId),
        email: JSON.parse(email),
      });
    }
  }, []);

  const userIsSignedIn = (() => {
    if (currentUser.email === "" && currentUser.userId === "") return false;
    return true;
  })();

  const contextValue = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
      userIsSignedIn,
    };
  }, [currentUser, userIsSignedIn]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context == null)
    throw new Error("must be used inside ToDoContextProvider");
  return context;
}
