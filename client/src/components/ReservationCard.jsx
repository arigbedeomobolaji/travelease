/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ReservationCard({ price }) {
  const [guestPickerOpened, setGuestPickerOpened] = useState(false);
  return (
    <div className="rounded-md flex flex-col bg-white shadow-md shadow-red-50 min-h-[100px] p-5 border-solid border border-red-50">
      <h1 className="font-bold font-lato text-[20px]">
        ₦{price} <span className="font-light text-sm text-gray-500">night</span>
      </h1>
      {/* Checking */}
      <div className="grid grid-cols-2 w-full justify-between pt-5 shadow-md">
        <div className="flex flex-col col-span-1 border border-solid border-gray-500 p-2 py-1 rounded-tl-md text-[18px]">
          Check in
          <input
            readOnly
            className="border-none outline-none text-[18px] text-red-800 font-semibold font-lato"
          />
        </div>
        <div className="flex flex-col col-span-1 border border-l-none border-solid border-gray-500 p-2 py-1 rounded-tr-md text-[18px]">
          Check out
          <input
            readOnly
            className="border-none outline-none text-[18px] text-red-800 font-semibold font-lato"
          />
        </div>
        <div className="flex flex-col col-span-2 border-t-none border-b border-r border-l border-t-none border-solid border-gray-500 p-2 py-1 rounded-b-md text-[18px] relative">
          Guest
          <input
            readOnly
            className="border-none outline-none text-[18px] text-red-800 font-semibold font-lato"
          />
          <div
            onClick={() => setGuestPickerOpened(!guestPickerOpened)}
            className="absolute right-5 bottom-1/2 translate-y-1/2 text-[25px] text-gray-700 cursor-pointer"
          >
            {guestPickerOpened ? <FaChevronDown /> : <FaChevronUp />}
          </div>
        </div>
      </div>
    </div>
  );
}
