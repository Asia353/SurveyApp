import React from "react";
import { useUserContext } from "../contexts/UserContext";
import AuthenticatedStack from "./AuthenticatedStack";
import UnauthenticatedStack from "./UnauthenticatedStack";

export default function Navigation() {
  const { userIsSignedIn } = useUserContext();

  if (userIsSignedIn) return <AuthenticatedStack />;
  return <UnauthenticatedStack />;
  // return (
  //   {userIsSignedIn ? <AuthenticatedStack /> : <UnauthenticatedStack />}
  // );
}
