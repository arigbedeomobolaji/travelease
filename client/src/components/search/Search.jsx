/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import { useMediaQuery } from "@react-hook/media-query";
import { AppContext } from "../../App";
import Filter from "./Filter";
import MenuItem from "../Menu";

const data = [
  {
    id: "adults",
    guestGroup: "Adults",
    description: "Ages 13 or aboveeeee",
    borderBottom: true,
  },
  {
    id: "children",
    guestGroup: "Children",
    description: "Ages 2–12",
    borderBottom: true,
  },
  { id: "infants", guestGroup: "Infants", description: "Under 2" },
];

function Boundary({ current }) {
  return (
    <div
      className={`w-0 h-5 border-r-2 ${
        current ? "border-red-200" : "border-red-300"
      } mx-[2px] my-auto`}
    />
  );
}
export default function Search() {
  const [search, setSearch] = useState("");
  const { current, setCurrent, toggleDate, toggleGuest, guests } =
    useContext(AppContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const isSmallScreen = useMediaQuery("(max-width: 36rem)");
  const isLargeScreen = useMediaQuery("(max-width: 900px)");

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  function handleDateChange(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  return (
    <div className="flex justify-center items-center font-roboto flex-col gap-5 relative">
      <div
        className={`flex ${
          current ? "bg-red-600" : "bg-white text-gray-900"
        } rounded-full p-[1px] shadow-lg`}
      >
        {/* Search Input */}
        <Filter
          placeholder="Search destination"
          label="search"
          value={search}
          handleChange={setSearch}
          width={"200px"}
          title={"Where"}
          current={current}
          setCurrent={setCurrent}
        />
        <Boundary current={current} />
        {/* Check in */}
        <Filter
          placeholder="Add dates"
          label="checkIn"
          value={startDate}
          handleChange={setStartDate}
          width={"300px"}
          title={"Check in"}
          current={current}
          setCurrent={setCurrent}
          readOnly={true}
        />
        <Boundary current={current} />
        {/* Check in */}
        <Filter
          placeholder="Add dates"
          label="checkOut"
          value={endDate}
          handleChange={setEndDate}
          width={"150px"}
          title={"Check in"}
          current={current}
          setCurrent={setCurrent}
          readOnly={true}
        />
        <Boundary current={current} />
        {/* Guest */}
        <Filter
          placeholder="Guests"
          label="guest"
          value={guests}
          handleChange={toggleGuest}
          width={"370px"}
          title={"Who"}
          readOnly
          current={current}
          setCurrent={setCurrent}
        />
        <div className="absolute top-20 left-0 right-0 flex items-center justify-center">
          {toggleDate ? (
            isSmallScreen ? (
              <DateRange
                ranges={[selectionRange]}
                onChange={handleDateChange}
                rangeColors={["#FD5B61"]}
                minDate={new Date()}
              />
            ) : (
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleDateChange}
                rangeColors={["#FD5B61"]}
                direction="horizontal"
                showDateDisplay={false}
                minDate={new Date()}
                retainEndDateOnFirstSelection={true}
                months={isLargeScreen ? 1 : 2}
              />
            )
          ) : null}
          {toggleGuest && (
            <div className="w-[300px] shadow-md absolute z-40 bg-white right-10 top-0">
              {data.map((datum) => (
                <MenuItem key={datum.guestGroup} {...datum} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
