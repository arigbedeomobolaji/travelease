/* eslint-disable react/prop-types */
import { DateRange, DateRangePicker } from "react-date-range";
// import useScreenSize from "../hooks/useScreenSize";

export default function BaseDatePicker({
  selectionRange,
  handleDateChange,
  isTabletScreen,
}) {
  //   const { isTabletScreen } = useScreenSize();
  return (
    <>
      {isTabletScreen ? (
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
          months={isTabletScreen ? 2 : 1}
        />
      )}
    </>
  );
}
