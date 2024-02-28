import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar as NavBarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useUserContext } from "../contexts/UserContext";
import { signOutFunction } from "../AuthFunctions";

export default function NavBar() {
  // const [selected, setSelected] = React.useState<string>("Add Survey");

  const { currentUser, setCurrentUser, userIsSignedIn } = useUserContext();
  return (
    <NavBarComponent>
      <NavbarBrand>
        <p className="font-bold text-inherit">{currentUser.email}</p>
      </NavbarBrand>

      {userIsSignedIn && (
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" to="/add-survey">
              Add Survey
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="/my-surveys">
              My Survey
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {!userIsSignedIn ? (
          <>
            <NavbarItem className="lg:flex">
              <Link to="/sign-in">Sign in</Link>
            </NavbarItem>
            <NavbarItem>
              {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
              <Link to="/sign-up">Sign up</Link>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Link
              to="/sign-in"
              onClick={() => {
                localStorage.clear();
                signOutFunction();
                setCurrentUser({ userId: "", email: "" });
              }}
            >
              Sign out
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </NavBarComponent>
  );
}
