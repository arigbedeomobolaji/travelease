/* eslint-disable react/prop-types */

import { Divider } from "antd";

export default function InlineContainer({ children, alignment }) {
  return (
    <div
      className={`text-[16px] leading-5 w-full lg:w-1/2 xl:w-3/5 inline-block pr-4 ${alignment}`}
    >
      {children}
      <Divider />
    </div>
  );
}
