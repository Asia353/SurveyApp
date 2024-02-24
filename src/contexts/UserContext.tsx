import React, { useContext, useEffect, useMemo, useState } from "react";
import { User } from "../types";

type UserContextType = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
};

const userContextInitValue = {
  currentUser: { userId: "", email: "" },
  setCurrentUser: () => {},
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

    const asyncFunction = async () => {
      if (userId && email) {
        setCurrentUser({
          userId: JSON.parse(userId),
          email: JSON.parse(email),
        });
      }
      // else {
      //   setCurrentUser({
      //     userId: "",
      //     email: "",
      //   });
      // }
    };
    asyncFunction();
  }, []);

  const contextValue = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
    };
  }, [currentUser]);

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
