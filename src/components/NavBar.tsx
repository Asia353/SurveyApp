import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar as NavBarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function NavBar() {
  // const [selected, setSelected] = React.useState<string>("Add Survey");

  return (
    <NavBarComponent>
      <NavbarBrand>
        <p className="font-bold text-inherit">ANKIETY</p>
      </NavbarBrand>

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

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link to="/log-in">Log in</Link>
        </NavbarItem>
        <NavbarItem>
          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
          <Link to="/sign-up">Sign up</Link>
        </NavbarItem>
      </NavbarContent>
    </NavBarComponent>
  );
}
