/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { services } from "../data/services";
import useScreenSize from "../hooks/useScreenSize";
import { IoMdShare } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import IconStyle from "../components/IconStyle";
import PhotosPreviewModal from "../components/modal/PhotosPreviewModal";
import { useState } from "react";
import Container from "../components/Container";

export default function ServicePage() {
  const [open, setOpen] = useState(false);
  const { serviceId } = useParams();
  const service = services.find((service) => (service.id = serviceId));
  const { isVerySmallScreen, isTabletScreen } = useScreenSize();
  function handlePhotoPreviewModal() {
    setOpen((cur) => !cur);
  }
  return (
    <>
      <div className="pt-7 font-roboto">
        <Container>
          {/* Category / Like and Share */}
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-[25px] md:text-[35px] font-extrabold">
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
          {isTabletScreen ? (
            <div className="relative pt-5" onClick={handlePhotoPreviewModal}>
              <img
                className="h-96 w-full object-cover object-center rounded-lg"
                src={service.serviceImages[0].src}
                alt={service.serviceImages[0].id}
              />
              <h1 className="absolute bottom-0 right-0 font-extrabold text-white text-[20px] bg-red-300 px-5 p-1 rounded-tl-lg">
                1/{service.serviceImages.length}
              </h1>
            </div>
          ) : null}
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
