import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import { signIn } from "../AuthFunctions";
import { useUserContext } from "../contexts/UserContext";

function Page() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const togglepwdIsVisible = () => {
    setPasswordIsVisible((visible) => !visible);
  };

  const { setCurrentUser } = useUserContext();

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
        <Button
          className="mt-11"
          onClick={async () => {
            const user = await signIn(emailValue, passwordValue);
            setCurrentUser(user);
            localStorage.setItem("email", JSON.stringify(user.email));
            localStorage.setItem("userId", JSON.stringify(user.userId));
          }}
          as={Link}
          to="/my-surveys"
        >
          Sign in
        </Button>
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
