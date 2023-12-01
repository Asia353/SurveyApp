import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar as NavBarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  Button,
} from "@nextui-org/react";

export default function Test() {
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
          <Link to="/test">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavBarComponent>
  );
}
