import { Button, Card, Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "iconsax-react";
import { Link } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { signUp } from "../AuthFunctions";

function Page() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const togglepwdIsVisible = () => {
    setPasswordIsVisible((visible) => !visible);
  };

  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const emailIsInvalid = useMemo(() => {
    if (emailValue === "") return false;
    return !validateEmail(emailValue);
  }, [emailValue]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="signin-component p-7 gap-3">
        <Input
          className="mt-7"
          placeholder="Enter your e-mail address"
          type="email"
          label="E-mail"
          variant="bordered"
          size="sm"
          onValueChange={setEmailValue}
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
          onValueChange={setPasswordValue}
        />
        {/* <Input
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
        /> */}
        <Button
          className="mt-11"
          onClick={() => signUp(emailValue, passwordValue)}
          as={Link}
          to="/sign-in"
        >
          Sign up
        </Button>
      </Card>
    </div>
  );
}

export default Page;
