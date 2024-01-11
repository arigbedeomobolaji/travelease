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

export default function LoginRegister({ open, handleOpenAuthModal, label }) {
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState(label);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          mount: { scale: 1, y: 50 },
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
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <div className="relative">
              <Input
                type={`${showPassword ? "text" : "password"}`}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                size="lg"
                className="pr-10"
              />
              <div className=" w-5 h-5 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3">
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>

            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="red"
              onClick={handleAuth}
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
          </CardFooter>
          <Divider />
        </Card>
      </Dialog>
    </>
  );
}
