/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { Typography } from "antd";
import { useState, useRef, useEffect, useMemo, useContext } from "react";
import OtpInput from "../../Otp";
import { FaChevronLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { resendCode, verifyUser } from "../../../queries/user.queries";
import { toast } from "react-toastify";
import { errorFormat } from "../../../utils/errorFormat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserAndToken } from "../../../redux/slices/userSlice";
import AppContext from "antd/es/app/context";

export default function VerifyEmail({ setShowVerify }) {
  const { handleOpenAuthModal } = useContext(AppContext);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const user = useSelector(selectUser);
  const memoizeOtp = useMemo(() => otp, []);
  const inputRefs = useRef([]);
  const verifyEmail = useQuery({
    queryKey: ["veryEmail", user?.email, code],
    meta: {
      code,
      email: user?.email,
    },
    queryFn: verifyUser,
    enabled: false,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const resendVerificationCode = useQuery({
    queryKey: ["resendCode", user?.email],
    meta: {
      email: user?.email,
    },
    queryFn: resendCode,
    enabled: false,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (verifyEmail?.data) {
      dispatch(setUserAndToken(verifyEmail.data.data));
    }
  }, [dispatch, handleOpenAuthModal, verifyEmail.data]);
  useEffect(() => {
    if (verifyEmail?.isError) {
      const { message } = errorFormat(verifyEmail.error);
      toast(message, {
        position: "top-right",
        theme: "colored",
      });
    }
  }, [verifyEmail.error, verifyEmail?.isError]);

  useEffect(() => {
    setCode(otp.join(""));
  }, [otp]);

  function handleEmailVerification() {
    // code goes here
    verifyEmail.refetch();
    console.log(verifyEmail.data);
    handleOpenAuthModal();
  }
  return (
    <div>
      <p
        className="absolute top-14 flex items-center cursor-pointer"
        onClick={() => setShowVerify(false)}
      >
        <FaChevronLeft className=" text-[20px] text-gray-800 shadow-lg" />{" "}
        <span className="text-xs">Go back</span>
      </p>

      <Typography className="text-gray-900 font-normal text-2xl text-center">
        Email Verification
      </Typography>
      <Typography
        className="text-center text-[17px] font-normal text-gray-900"
        variant="paragraph"
        color="gray"
      >
        <strong>Check your Email for an OTP Code </strong>.
      </Typography>
      {/* Enter Verification */}
      <div className="flex justify-center items-center flex-col gap-4">
        <OtpInput otp={otp} setOtp={setOtp} inputRefs={inputRefs} />
        <Button
          className="w-72 py-4"
          color="red"
          disabled={code.length !== 6}
          onClick={handleEmailVerification}
        >
          Let&apos;s check
        </Button>
        <p className="py-5 text-gray-600 font-normal font-lato ">
          Didn&apos;t receive an OTP?{" "}
          <span
            className="text-blue-600 font-bold cursor-pointer"
            onClick={() => {
              setOtp(memoizeOtp);
              resendVerificationCode.refetch();
            }}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}
