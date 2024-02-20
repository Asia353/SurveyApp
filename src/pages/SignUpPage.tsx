import { Button, Card, Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "iconsax-react";
import React, { useState } from "react";

function Page() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const togglepwdIsVisible = () => {
    setPasswordIsVisible((visible) => !visible);
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
          className=""
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
        <Input
          className="mb-7"
          placeholder="Enter your password"
          type={passwordIsVisible ? "text" : "password"}
          label="Repeat password"
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
        <Button>Sign up</Button>
      </Card>
    </div>
  );
}

export default Page;
