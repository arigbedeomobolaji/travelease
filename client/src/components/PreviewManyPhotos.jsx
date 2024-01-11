/* eslint-disable react/prop-types */

import { Button } from "@material-tailwind/react";
import { FaChevronRight } from "react-icons/fa";

export default function PreviewManyPhotos({ images }) {
  const firstImage = images[0];
  const otherImages = images.slice(1, 5);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 h-[450px] gap-4 p-3 relative">
      {/* First Image */}
      <div className="col-span-1 xl:col-span-3">
        <img
          className="h-[420px] w-full object-cover object-center rounded-lg"
          src={firstImage.src}
          alt={firstImage.id}
          loading="lazy"
        />
      </div>
      {/* Other Four Images */}
      <div className="hidden xl:grid grid-cols-2 col-span-2 gap-2 max-h-[450px]">
        {otherImages.length === 1 ? (
          <img
            key={otherImages[0].id}
            className="h-full bg-red-500 w-full object-cover object-center rounded-lg col-span-2"
            src={otherImages[0].src}
            alt={otherImages[0].id}
            loading="lazy"
          />
        ) : otherImages.length === 2 ? (
          otherImages.map((image, index) => (
            <img
              key={image.id + index}
              className="h-full w-full object-cover object-center rounded-lg col-span-1"
              src={image.src}
              alt={image.id}
              loading="lazy"
            />
          ))
        ) : otherImages.length === 3 ? (
          otherImages.map((image, index) =>
            index === otherImages.length - 1 ? (
              <img
                key={image.id + index}
                className="h-[200px] w-full object-cover object-center rounded-lg col-span-2"
                src={image.src}
                alt={image.id}
                loading="lazy"
              />
            ) : (
              <img
                key={image.id + index}
                className="h-[200px] w-full object-cover object-center rounded-lg col-span-1"
                src={image.src}
                alt={image.id}
                loading="lazy"
              />
            )
          )
        ) : (
          otherImages.map((image, index) => (
            <img
              key={image.id + index}
              className="h-[200px] w-full object-cover object-center rounded-lg col-span-1"
              src={image.src}
              alt={image.id}
              loading="lazy"
            />
          ))
        )}
      </div>
      <Button className="absolute bottom-7 right-5 bg-gray-900/30 flex items-center pt-3">
        Show all photos <FaChevronRight className="text-[18px]" />
      </Button>
    </div>
  );
}
