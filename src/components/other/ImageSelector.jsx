import Dropzone from "react-dropzone";
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";

export default function ImageSelector({ images, setImages }) {
  useEffect(() => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result)
          setPreviewImages((prev) => [...prev, reader.result.toString()]);
      };
      if (images[i]) {
        reader.readAsDataURL(images[i]);
      }
    }
  }, [images]);

  const [previewImages, setPreviewImages] = useState([]);
  return (
    <div className="w-full">
      <Dropzone
        onDrop={(acceptedFiles) => {
          const fileToShow = acceptedFiles
            .filter((item) => item.type.includes("image"))
            .slice(0, 5);
          setImages(fileToShow);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="w-full">
            <div
              {...getRootProps()}
              className="h-[200px] w-full border-2 border-slate-500 p-5 flex justify-center items-center border-dashed"
            >
              <input {...getInputProps()} />
              <p className="text-center">
                Drag and drop files
                <br /> (up to 4)
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="flex flex-nowrap overflow-auto w-full gap-4 py-4 md:flex-wrap">
        {previewImages &&
          previewImages.map((image) => (
            <div
              key={image}
              className="relative inline-block h-[100px] flex-none"
            >
              <img
                src={image}
                alt={image}
                width={200}
                height={100}
                className="w-[100px]"
              />
              <button
                variant={"secondary"}
                className="w-[24px] h-[24px] flex justify-center items-center bg-opacity-80 p-1 bg-black absolute top-1 left-1"
                onClick={() =>
                  setPreviewImages((prev) =>
                    prev.filter((item) => item !== image)
                  )
                }
              >
                <XIcon color="white" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
