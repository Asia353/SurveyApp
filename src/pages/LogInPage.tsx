import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";
import { Link } from "react-router-dom";

function Page() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const togglepwdIsVisible = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="login-component p-7 gap-3">
        <Input
          className="mt-7"
          placeholder="Enter your e-mail address"
          type="email"
          label="E-mail"
          variant="bordered"
          size="sm"
        />
        <Input
          className="mb-7"
          placeholder="Enter your password"
          type={passwordIsVisible ? "text" : "password"}
          label="Password"
          variant="bordered"
          size="sm"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglepwdIsVisible}
            >
              <div>
                {passwordIsVisible ? <EyeSlash size="16" /> : <Eye size="16" />}
              </div>
            </button>
          }
        />
        <Button>Log in</Button>
        <Button
          className="p-0 m-0 self-end"
          variant="light"
          as={Link}
          to="/sign-up"
        >
          Sign up
        </Button>
      </Card>
    </div>
  );
}

export default Page;
