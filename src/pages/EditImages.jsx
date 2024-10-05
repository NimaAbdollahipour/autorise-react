import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NextGenHeader from "../components/headers/NextGenHeader";
import { supabase } from "../api/supabaseClient";
import { getAdDetails } from "../api/buyer";
import { uploadNewImages } from "../api/seller";
import { LoaderIcon, XIcon } from "lucide-react";
import ImageSelector from "../components/other/ImageSelector";
import { getImagesByName } from "../api/allUsers";
import { Toast } from "primereact/toast";

export default function EditImages() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const toastRef = useRef(null);

    useEffect(() => {
        getAdDetails(parseInt(id)).then(({ status, data }) => {
            if (status === "success") {
                setImages(data.imageURLs);
                getImagesByName(data.imageURLs).then(({ status, data }) => {
                    if (status === "success") {
                        setImages(data);
                        setLoading(false);
                    }
                });
            }
        });
    }, []);

    function uploadSelectedImages() {
        uploadNewImages(
            id,
            newImages,
            () => {},
            images.map((item) => item.name)
        ).then(({ status }) => {
            if (status === "success") {
                toastRef.current.show([
                    {
                        severity: "success",
                        summary: "Success",
                        detail: "Uploaded Successfully",
                        life: 3000,
                    },
                ]);
            }
        });
    }

    function deleteSelectedImage(name) {
        supabase.storage
            .from("images")
            .remove(name)
            .then(({ error }) => {
                if (error) console.log(error);
                else {
                    console.log("success");
                    let imageList = images.map((item) => item.name);
                    imageList = imageList.filter((item) => item !== name);
                    supabase
                        .from("cars")
                        .update({ imageURLs: imageList })
                        .eq("id", id)
                        .then(({ error }) => {
                            if (error) {
                                console.log(error);
                            } else {
                                setImages((prev) =>
                                    prev.filter((item) => item.name !== name)
                                );
                                toastRef.current.show([
                                    {
                                        severity: "success",
                                        summary: "Success",
                                        detail: "Deleted Successfully",
                                        life: 3000,
                                    },
                                ]);
                            }
                        });
                }
            });
    }

    return (
        <div>
            <NextGenHeader />
            <Toast ref={toastRef} />
            {loading ? (
                <div className="flex items-center justify-center mt-20">
                    <LoaderIcon className="animate-spin" />
                </div>
            ) : (
                <div className="p-5">
                    <div className="flex flex-col max-w-[1200px] m-auto gap-8 p-5 sm:grid-cols-2  bg-white mt-5 rounded-lg">
                        <ImageSelector
                            images={newImages}
                            setImages={setNewImages}
                        />
                        <div>
                            <button
                                className="btn btn-neutral"
                                onClick={uploadSelectedImages}
                            >
                                upload images
                            </button>
                        </div>
                        <h2 className="p-0 font-bold">Current Images</h2>
                        <span className="alert alert-warning text-xs">
                            If total is more than 4, images will not be added
                        </span>
                        <div className="flex flex-row gap-5 flex-warp">
                            {images.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="h-20 w-20 border border-gray-200 relative"
                                >
                                    <img
                                        src={item.url}
                                        className="h-full w-full object-contain"
                                    />
                                    <button
                                        className="rounded-full h-[24px] w-[24px] bg-gray-200 flex justify-center items-center absolute top-[-12px] left-[-12px]"
                                        onClick={() =>
                                            deleteSelectedImage(item.name)
                                        }
                                    >
                                        <XIcon size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
