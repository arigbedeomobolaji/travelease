/* eslint-disable react/prop-types */
import { useContext } from "react";
import moment from "moment";
import { AppContext } from "../../App";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

// ${
//           !current
//             ? "text-gray-900 hover:text-white"
//             : current === label
//             ? "text-red-600"
//             : "text-white"
//         }

/* 

${
          !current
            ? "text-gray-900"
            : current === label
            ? "text-gray-800 placeholder-gray-900 hover:placeholder-black"
            : "text-white placeholder-white hover:placeholder:placeholder-black"
        } 

*/

export default function Filter({
  placeholder,
  label,
  value,
  handleChange,
  width,
  title,
  current,
  setCurrent,
  readOnly,
}) {
  const { setToggleDate } = useContext(AppContext);
  const display =
    typeof value === "object" ? moment(value).format("DD-MM-yyyy") : value;
  function handleFilterClick() {
    setCurrent(label);
    if (label === "checkIn" || label === "checkOut") {
      setToggleDate(true);
    }
  }
  return (
    <div
      className={`${
        !current
          ? "hover:bg-red-500 hover:text-white"
          : current === label
          ? "bg-white text-red-500"
          : "bg-transparent hover:bg-red-500 hover:cursor-pointer"
      } shadow-sm rounded-full w-[${width}] pl-5 pt-3 relative font-roboto hover:placeholder-white placeholder:text-sm`}
      onClick={handleFilterClick}
    >
      <p className={`text-[14px] leading-3`}>{title}</p>
      <input
        placeholder={placeholder}
        value={display}
        readOnly={readOnly}
        onChange={(ev) => handleChange(ev.target.value)}
        className={`${
          !current
            ? "hover:placeholder-white placeholder-gray-700 text-gray-700 hover:text-white"
            : current === label
            ? "text-gray-700 placeholder:text-gray-700"
            : "bg-transparent hover:bg-red-500 hover:cursor-pointer"
        } bg-transparent outline-none border-none py-2 w-full pr-4 `}
      />
      {/*  */}
      {!!value && (
        <CloseOutlined
          className="text-xs text-gray-400 hover:bg-gray-100 w-5 h-5 my-auto rounded-full  flex items-center justify-center  absolute right-5 top-0 bottom-0 cursor-pointer"
          onClick={() => handleChange("")}
        />
      )}
      {label === "guest" && (
        <div className="w-10 h-10 rounded-full p-3 bg-red-500 absolute top-3 hover:bg-white bottom-0 right-3 flex items-center justify-center">
          <SearchOutlined className="text-white text-xl hover:text-red-500 flex items-center" />
        </div>
      )}
    </div>
  );
}
