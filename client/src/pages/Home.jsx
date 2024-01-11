import { useContext } from "react";
import { AppContext } from "../App";
import SubFilters from "../components/SubFilters";
import { Divider } from "antd";
import MediumCard from "../components/MediumCard";

export default function Home() {
  const { setToggleGuest, setToggleDate } = useContext(AppContext);

  return (
    <div
      onClick={() => {
        setToggleGuest(false);
        setToggleDate(false);
      }}
    >
      <div className="max-w-[1600px] mx-5 lg:mx-auto relative z-10">
        <SubFilters />
        <Divider className="m-0 p-0 border-b-2 border-b-red-50" />
        <div className="flex flex-wrap gap-5 py-5 justify-start mx-5 md:justify-between">
          <MediumCard rating={5} />
          <MediumCard rating={5} />
          <MediumCard rating={5} />
          <MediumCard rating={5} />
          <MediumCard rating={5} />
          <MediumCard rating={5} />
          <MediumCard rating={5} />
          <MediumCard rating={5} />
          <MediumCard rating={5} />
        </div>
      </div>
    </div>
  );
}
