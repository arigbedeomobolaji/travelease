import { Button } from "@material-tailwind/react";
import { Input, Typography } from "antd";
import { useState } from "react";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  return (
    <div>
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
        <Input
          placeholder="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-72 py-4 my-5  !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}
        />
        <Button className="w-72 py-4" color="red" disabled={code.length !== 6}>
          Let&apos;s check
        </Button>
      </div>
    </div>
  );
}
