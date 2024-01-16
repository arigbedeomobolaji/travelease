/* eslint-disable react/prop-types */
import imageCompression from "browser-image-compression";

import { Button } from "@material-tailwind/react";
import { useRef } from "react";

export default function ImageCompression({ setFiles, files }) {
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    // const compressedImages = [];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      for (const file of files) {
        console.log(files);
        const compressedFile = await imageCompression(file, options);
        console.log(file);
        setFiles((prev) => [...prev, compressedFile]);
        // compressedImages.push(compressedFile);
      }
      // onUpload(compressedImages);
    } catch (error) {
      console.log(error);
    }

    // onUpload(compressedImages);
  };

  // console.log(files);

  return (
    <div>
      <Button
        onClick={() => {
          fileRef.current.click();
          setFiles([]);
        }}
      >
        Select Images
      </Button>
      <input
        ref={fileRef}
        className="w-80 hidden"
        hidden
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
      />
      {!!files.length && (
        <div className="flex flex-wrap bg-gray-50 text-gray-900 rounded-md w-80 p-5 items-start m-5 gap-3">
          {files.map((file, index) => (
            <p key={Math.random() + index} className="font-lato">
              {file.name} {index < files.length && ","}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
