/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { services } from "../data/services";
import useScreenSize from "../hooks/useScreenSize";
import { IoMdShare } from "react-icons/io";
import { Divider } from "antd";
import { MdFavoriteBorder } from "react-icons/md";
import IconStyle from "../components/IconStyle";
import PhotosPreviewModal from "../components/modal/PhotosPreviewModal";
import { useState } from "react";
import Container from "../components/Container";
import PreviewManyPhotos from "../components/PreviewManyPhotos";
import { Typography } from "@material-tailwind/react";
import ReservationCard from "../components/ReservationCard";
import InlineContainer from "../components/InlineContainer";
import WhatYouEnjoy from "../components/WhatYouEnjoy";
import Environs from "../components/Environs";
import DatePicker from "../components/DatePicker";
import Reviews from "../components/Reviews";
import StarIcon from "../components/StarIcon";
import ThingsToKnow from "../components/ThignsToKnow";

export default function ServicePage() {
  const [open, setOpen] = useState(false);
  const { serviceId } = useParams();
  const service = services.find(
    (service) => service.serviceId.toString() === serviceId
  );
  const { isVerySmallScreen, isTabletScreen } = useScreenSize();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  function handleDateChange(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  function handlePhotoPreviewModal() {
    setOpen((cur) => !cur);
  }
  return (
    <>
      <div className="pt-7 font-roboto scroll-smooth">
        <Container>
          {/* Category / Like and Share */}
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-[25px] md:text-[35px] font-extrabold transition-all ease-linear">
              {service.serviceCategory}
            </h1>
            <div className="flex justify-between items-center gap-5">
              <IconStyle
                isVerySmallScreen={isVerySmallScreen}
                Icon={IoMdShare}
                label="Share"
              />
              <IconStyle
                isVerySmallScreen={isVerySmallScreen}
                Icon={MdFavoriteBorder}
                label="Save"
              />
            </div>
          </div>
          {/* Service Images */}
          <div onClick={handlePhotoPreviewModal}>
            {isTabletScreen ? (
              <div className="relative pt-5">
                <img
                  className="h-96 w-full object-cover object-center rounded-lg"
                  src={service.serviceImages[0].src}
                  alt={service.serviceImages[0].id}
                />
                <h1 className="absolute bottom-0 right-0 font-extrabold text-white text-[20px] bg-red-300 px-5 p-1 rounded-tl-lg">
                  1/{service.serviceImages.length}
                </h1>
              </div>
            ) : (
              <PreviewManyPhotos images={service.serviceImages} />
            )}
          </div>
          {/* Details about service */}
          <div className="flex flex-col gap-2">
            <Typography
              variant={`${
                isVerySmallScreen ? "h6" : isTabletScreen ? "h5" : "h4"
              }`}
              className="pt-3 font-roboto"
            >
              Comfortable Room in {service.company}, {service.serviceState}
            </Typography>
            <StarIcon rating={service.serviceRating} />
            <Typography variant="paragraph" className="font-lato text-justify">
              {service.companyDescription}
            </Typography>
          </div>
          <Divider />
          {/* Payment and Reservation */}

          <InlineContainer alignment="text-justify">
            <p className="leading-7">{service.companyDescription}</p>
            <Divider />
            <Environs />

            <Divider />
            <WhatYouEnjoy />

            <Divider />
            <DatePicker
              selectionRange={selectionRange}
              handleDateChange={handleDateChange}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
            />
          </InlineContainer>
          <div
            className={`hidden md:inline-block text-[20px] 
            top-20 md:w-1/2 xl:w-2/5 align-top pl-5 lg:pl-10 ${"sticky top-20"} scroll-smooth`}
            style={{
              zIndex: -1,
            }}
          >
            <ReservationCard
              price={service.servicePrice}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </Container>
        <Divider />
        <Container>
          <div className="bg-white">
            <Reviews />
            <Divider />
            <ThingsToKnow />
          </div>
        </Container>
      </div>
      {/* Modal codes goes here */}
      <PhotosPreviewModal
        open={open}
        handlePhotoPreviewModal={handlePhotoPreviewModal}
        images={service.serviceImages}
      />
    </>
  );
}
