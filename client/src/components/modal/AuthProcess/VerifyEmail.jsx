/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { Typography } from "antd";
import { useState, useRef, useEffect, useMemo } from "react";
import OtpInput from "../../Otp";
import { FaChevronLeft } from "react-icons/fa";

export default function VerifyEmail({ setShowVerify }) {
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const memoizeOtp = useMemo(() => otp, []);
  const inputRefs = useRef([]);
  console.log(code);
  useEffect(() => {
    setCode(otp.join(""));
  }, [otp]);
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
        <Button className="w-72 py-4" color="red" disabled={code.length !== 6}>
          Let&apos;s check
        </Button>
        <p className="py-5 text-gray-600 font-normal font-lato ">
          Didn&apos;t receive an OTP?{" "}
          <span
            className="text-blue-600 font-bold cursor-pointer"
            onClick={() => setOtp(memoizeOtp)}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}
