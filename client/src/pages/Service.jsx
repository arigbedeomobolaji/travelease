/* eslint-disable react/prop-types */
import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { getStatesOfCountry } from "../utils/countries";
import { useMutation } from "@tanstack/react-query";
import { useCountries } from "use-react-countries";
import { updateRegistrationMutation } from "../queries/user.mutation";
import { errorFormat } from "../../../api/src/utils/shared";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../App";
import {
  selectToken,
  selectUser,
  setUserAndToken,
} from "../redux/slices/userSlice";
import { TiInfoLarge } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

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

function InputIcon({ value, setValue, label, icon, readOnly }) {
  return (
    <div className="w-80">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={label}
        icon={icon}
        className="h-20"
        readOnly={readOnly}
      />
    </div>
  );
}

function LocationTracker({ lat, setLat, long, setLong }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLat, setLong]);
  console.log(lat, long);
  return (
    <div className="flex gap-5 items-center justify-center w-80 flex-col">
      <Input value={lat || 0} label="Latitude" readOnly className="w-full" />
      <Input value={long || 0} label="Longitude" readOnly className="w-full" />
      <p className="font-lato font-normal italic text-md text-gray-700 flex items-center">
        <TiInfoLarge /> Lat and Long let&apos;s know your exact location on the
        map.
      </p>
    </div>
  );
}
export default function Service() {
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [companyCity, setCompanyCity] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const { handleOpenAuthModal } = useContext(AppContext);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  console.log(token);

  const updateUserMutation = useMutation({
    mutationFn: updateRegistrationMutation,
    onError: (error) => {
      const { message } = errorFormat(error);
      toast.error(message, {
        position: "top-center",
        theme: "colored",
      });
    },
    onSuccess: (data) => {
      // save user and token to redux store here
      if (data.data.token) {
        // Save token to redux store because we will need it later in the future.
        // close modal
        dispatch(setUserAndToken(data.data));
        navigate("/service/create");
      }
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      handleOpenAuthModal();
    }

    if (user.accountType === "services") {
      navigate("/service/create");
    }
  }, [handleOpenAuthModal, navigate, user]);
  function handleProfileUpdate() {
    console.log("here");
    updateUserMutation.mutate({
      registrationNumber: companyId,
      country,
      state,
      city: companyCity,
      accountType: "services",
      name: companyName,
      location: {
        lat,
        long,
      },
      token,
    });
  }
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
            value={user?.email}
            label="Company Email"
            icon={
              <p className="font-extrabold font-xl font-lato items-center">@</p>
            }
            readOnly
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
          <LocationTracker
            lat={lat}
            setLat={setLat}
            long={long}
            setLong={setLong}
          />
          <Button color="red" className="w-80" onClick={handleProfileUpdate}>
            Continue
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
