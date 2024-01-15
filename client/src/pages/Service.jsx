/* eslint-disable react/prop-types */
import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { getStatesOfCountry } from "../utils/countries";
import { useCountries } from "use-react-countries";

export function CountriesSelect({ country, setCountry }) {
  const { countries } = useCountries();

  return (
    <div className="w-80">
      <Select
        size="lg"
        label="Select Country"
        value={country}
        onChange={(e) => setCountry(e)}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
      >
        {countries.map(({ name, flags }) => (
          <Option key={name} value={name} className="flex items-center gap-2">
            <img
              src={flags.svg}
              alt={name}
              className="h-5 w-5 rounded-full object-cover"
            />
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export function SelectInput({ data, label, value, setValue }) {
  console.log(data);
  return (
    <div className="w-80">
      <Select
        label={label}
        value={value}
        onChange={(datum) => {
          console.log(datum);
          setValue(datum);
        }}
      >
        {data?.map((datum) => (
          <Option
            key={datum.stateCode}
            value={datum.state}
            className="text-lg text-gray-500 font-lato hover:!bg-red-50 active:bg-red-50 focus:bg-red-50"
          >
            {datum.state}
          </Option>
        ))}
      </Select>
    </div>
  );
}

function InputIcon({ value, setValue, label, icon }) {
  return (
    <div className="w-80">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={label}
        icon={icon}
        className="h-20"
      />
    </div>
  );
}
export default function Service() {
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  console.log(country, state);
  return (
    <div>
      <div>
        {/* services */}
        {/* Login */}
        <div className="flex gap-5 flex-col shadow-md shadow-red-50/70 my-10 max-w-xl mx-auto p-10">
          <h1 className="text-[25px] text-extrabold font-lato text-gray-800">
            Register your company with us.
          </h1>
          <InputIcon
            value={companyEmail}
            setValue={setCompanyEmail}
            label="Company Email"
            icon={
              <p className="font-extrabold font-xl font-lato items-center">@</p>
            }
          />
          <InputIcon
            value={companyName}
            setValue={setCompanyName}
            label="Company Name"
          />
          <InputIcon
            value={companyId}
            setValue={setCompanyId}
            label="Company Id"
          />
          <CountriesSelect country={country} setCountry={setCountry} />
          <SelectInput
            label="State"
            data={getStatesOfCountry(country)}
            setValue={setState}
            value={state}
          />
          <InputIcon
            value={companyCity}
            setValue={setCompanyCity}
            label="Company City"
          />
          <Button color="red" className="w-80">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
