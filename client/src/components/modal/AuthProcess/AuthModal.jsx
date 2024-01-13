/* eslint-disable react/prop-types */
import { Card, CardBody, Dialog } from "@material-tailwind/react";
import LoginRegister from "./LoginRegister";
import { useState } from "react";
import VerifyEmail from "./VerifyEmail";
import useScreenSize from "../../../hooks/useScreenSize";

export default function AuthModal({ open, handleOpenAuthModal, label }) {
  const { isVerySmallScreen } = useScreenSize();
  const [showVerify, setShowVerify] = useState(false);
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
        <Card className="mx-auto w-full max-w-[28rem]  pt-7 py-5">
          <CardBody className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Hotels.com_Logo.png/150px-Hotels.com_Logo.png"
                alt="logo"
                loading="lazy"
                className={`${
                  isVerySmallScreen ? "w-[150px]" : "w-[200px]"
                }  object-contain`}
              />
            </div>

            {showVerify ? (
              <VerifyEmail />
            ) : (
              <LoginRegister label={label} setShowVerify={setShowVerify} />
            )}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
