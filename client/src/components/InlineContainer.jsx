/* eslint-disable react/prop-types */

import { Divider } from "antd";

export default function InlineContainer({ children }) {
  return (
    <div className="text-[16px] leading-5 w-full lg:w-1/2 inline-block pr-4 text-justify">
      {children}
      <Divider />
    </div>
  );
}
