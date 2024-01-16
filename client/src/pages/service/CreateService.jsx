/* eslint-disable react/prop-types */
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateRegistrationMutation } from "../../queries/user.mutation";
import { errorFormat } from "../../../../api/src/utils/shared";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../App";
import {
  selectToken,
  selectUser,
  setUserAndToken,
} from "../../redux/slices/userSlice";
import { TiInfoLarge } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import ImageCompression from "../../components/images/ImageCompressor";

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

function handleUpload(data) {
  console.log(data);
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
export default function CreateService() {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [serviceCity, setServiceCity] = useState("");
  // const [webpImages, setWebpImages] = useState([]);
  const dispatch = useDispatch();
  const { handleOpenAuthModal } = useContext(AppContext);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

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
      navigate("/", {
        state: location.pathname,
      });
    }

    if (user?.accountType === "services") {
      navigate("/service/create");
    }
  }, [handleOpenAuthModal, location.pathname, navigate, user]);

  function handleProfileUpdate() {
    console.log("here");
    updateUserMutation.mutate({
      city: serviceCity,
      accountType: "services",
      name: serviceName,
      location: {
        lat,
        long,
      },
      token,
    });
  }
  if (!user) {
    return;
  }
  return (
    <div>
      <div>
        {/* services */}
        {/* Login */}
        <div className="flex gap-5 flex-col shadow-md shadow-red-50/70 my-10 max-w-xl mx-auto p-10">
          <h1 className="text-[25px] text-extrabold font-lato text-gray-800">
            Create a service
          </h1>
          <InputIcon
            value={user?.email}
            label="Service Email"
            icon={
              <p className="font-extrabold font-xl font-lato items-center">@</p>
            }
            readOnly
          />
          <InputIcon
            value={serviceName}
            setValue={setServiceName}
            label="Service Name"
          />
          <div className="w-80">
            <Textarea
              label="Service Description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </div>
          <InputIcon
            value={serviceCity}
            setValue={setServiceCity}
            label="Service City"
          />
          <LocationTracker
            lat={lat}
            setLat={setLat}
            long={long}
            setLong={setLong}
          />
          <div>
            <h1>Please provide photos of the service you&apos;re rendering.</h1>
            <ImageCompression onUpload={handleUpload} />
          </div>
          <Button color="red" className="w-80" onClick={handleProfileUpdate}>
            Create
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
