/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  Card,
  //   CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useMediaQuery } from "@react-hook/media-query";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { TiInfoLarge } from "react-icons/ti";

function MyInput({ label, value, setValue, type, icon, constraints }) {
  return (
    <div>
      <Input
        label={label}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        icon={icon}
        value={value}
        size="lg"
      />
      {constraints && (
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center gap-1 font-normal"
        >
          <TiInfoLarge /> {constraints}
        </Typography>
      )}
    </div>
  );
}

export default function LoginRegister({ open, handleOpenAuthModal, label }) {
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState(label);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {}, [showPassword]);

  const canContinue = !email && !!password;

  function handleAuth() {
    // code for handling Authentication Here
  }

  useEffect(() => {
    setAction(label);
  }, [label]);

  function toggleAction() {
    setAction((prev) => {
      if (prev === "Login") {
        return "Register";
      }
      return "Login";
    });
  }

  const isVerySmallScreen = useMediaQuery("(max-width: 450px)");
  return (
    <>
      <Dialog
        size="xs"
        animate={{
          mount: { scale: 1, y: 3 },
          unmount: { scale: 0.9, y: -100 },
        }}
        open={open}
        handler={handleOpenAuthModal}
        className="bg-transparent shadow-md font-roboto"
      >
        <Card className="mx-auto w-full max-w-[28rem]">
          <CardBody className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-center pt-7 py-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Hotels.com_Logo.png/150px-Hotels.com_Logo.png"
                alt="logo"
                loading="lazy"
                className={`${
                  isVerySmallScreen ? "w-[150px]" : "w-[200px]"
                }  object-contain`}
              />
            </div>
            <Typography className="text-gray-900 font-normal text-2xl text-center">
              Welcome
            </Typography>
            <Typography
              className="text-center text-[17px] font-normal text-gray-900"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to <strong>{action}</strong>.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>

            <MyInput
              label="Email"
              value={email}
              setValue={setEmail}
              constraints="Must be a valid Email"
              icon={<p className="font-extrabold text-black ">@</p>}
            />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <MyInput
              label="Password"
              value={password}
              type={`${showPassword ? "text" : "password"}`}
              setValue={setPassword}
              showPassword={showPassword}
              icon={
                showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} />
                )
              }
              constraints="Must be more than three chars"
            />

            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="red"
              onClick={handleAuth}
              disabled={!canContinue}
              fullWidth
              className="bg-red-500"
            >
              {action}
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={toggleAction}
              >
                {action === "Login" ? "Register" : "Login"}
              </Typography>
            </Typography>
            <Divider>Or</Divider>
            <Button
              variant="outlined"
              fullWidth
              className="flex items-center text-left gap-3 mb-10"
            >
              <FcGoogle className="text-lg" />
              <Typography
                variant="paragraph"
                className="font-medium capitalize font-lato"
              >
                Continue with Google
              </Typography>
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
