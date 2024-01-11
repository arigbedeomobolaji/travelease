/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import SwiperCard from "./SwiperCard";
const images = [
  {
    src: "https://a0.muscache.com/im/pictures/miso/Hosting-922949911064943410/original/771408f3-106e-449d-99d5-da6e20919942.jpeg?im_w=720",
    id: 1,
  },
  {
    src: "https://a0.muscache.com/im/pictures/miso/Hosting-922949911064943410/original/771408f3-106e-449d-99d5-da6e20919942.jpeg?im_w=720",
    id: 1,
  },
  {
    src: "https://a0.muscache.com/im/pictures/miso/Hosting-922949911064943410/original/5ce29362-a426-4ac4-bd8a-65a2e00033c8.jpeg?im_w=1200",
    id: 1,
  },
  {
    src: "https://a0.muscache.com/im/pictures/miso/Hosting-922949911064943410/original/5ce29362-a426-4ac4-bd8a-65a2e00033c8.jpeg?im_w=1200",
    id: 1,
  },
  {
    src: "https://a0.muscache.com/im/pictures/miso/Hosting-922949911064943410/original/5ce29362-a426-4ac4-bd8a-65a2e00033c8.jpeg?im_w=1200",
    id: 1,
  },
  {
    src: "https://a0.muscache.com/im/pictures/miso/Hosting-922949911064943410/original/5ce29362-a426-4ac4-bd8a-65a2e00033c8.jpeg?im_w=1200",
    id: 1,
  },
];
export default function MediumCard({ rating }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex flex-col max-w-[600px] md:w-[350px] xl:w-[300px] font-roboto shadow-md shadow-red-50">
      <div className="bg-red-50 rounded-md relative w-full flex flex-grow h-[300px]  md:h-[300px]">
        <SwiperCard images={images} />
        <div className="absolute top-3 right-3 left-5 flex items-center justify-between ">
          <div className="bg-gray-50 rounded-full px-5 py-2 text-sm text-red-500 font-bold flex items-center gap-2">
            Book
            <MdLogin className="text-20px" />
          </div>
          <div className="w-10 h-10 p-2 bg-red-50 rounded-full flex items-center hover:scale-105">
            {liked ? (
              <MdFavorite
                className="text-red-500 text-[30px] cursor-pointer"
                onClick={() => setLiked(!liked)}
              />
            ) : (
              <MdFavoriteBorder
                className="text-red-500 outline-red-50 stroke-red-50 text-[30px] cursor-pointer"
                onClick={() => setLiked(!liked)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
        <h3 className="font-bold text-lg md:text-md">Location</h3>
        {rating && (
          <div className="flex h-full justify-end items-center py-2">
            <FaStar />
            <span className="text-gray-500 font-light">{rating}</span>
          </div>
        )}
      </div>
      <p className="text-gray-500 px-2 leading-5">xxx kilometers away</p>
      <p className="text-gray-500 px-2  leading-5">jun 16 - 21</p>
      <p className="text-gray-500 px-2 py-2 font-thin">
        <strong className="text-gray-900 font-bold">₦ 16,000</strong> night
      </p>
    </div>
  );
}
