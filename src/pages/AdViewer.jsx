import { BookMarkedIcon, BookmarkIcon } from "lucide-react";
import ImageViwer from "../components/other/ImageViewer";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdViewSkeleton from "../components/skeletons/AdViewSkeleton";
import { getAdById, removeSavedAd, saveAd } from "../api/buyer";
import { UserContext } from "../contexts/UserContext";
import { getImages } from "../api/allUsers";
import NextGenHeader from "../components/headers/NextGenHeader";
import { supabase } from "../api/supabaseClient";
import CurrencyViewer from "../components/other/CurrencyViewer";

export default function AdViewer() {
    const [bookmark, setBookmark] = useState(false);
    const { id } = useParams();
    const { userId } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [details, setDetails] = useState({});
    const [loadingAd, setLoadingAd] = useState(false);

    useEffect(() => {
        if (id && userId) {
            getAdById(id, userId).then(({ status, data, saved }) => {
                if (status === "success") {
                    getImages(data.imageURLs).then(({ status, data }) => {
                        if (status === "success") {
                            setImages(data);
                        }
                    });
                    setDetails(data);
                    setLoadingAd(false);
                    setBookmark(saved);
                }
            });
        } else {
            supabase
                .from("cars")
                .select(
                    "title, model, brand(name), color(name), year, price, currency(name), imageURLs"
                )
                .single()
                .eq("id", id)
                .then(({ data, error }) => {
                    if (!error) {
                        setDetails(data);
                        setLoadingAd(false);
                        getImages(data.imageURLs).then(({ status, data }) => {
                            if (status === "success") {
                                setImages(data);
                            }
                        });
                        setBookmark(data.saved);
                    }
                });
        }
    }, [userId, id]);

    function handleBookMarkChange() {
        if (bookmark) {
            removeSavedAd(bookmark).then(({ status }) => {
                if (status === "success") {
                    setBookmark(false);
                }
            });
        } else {
            saveAd(userId, id).then(({ status }) => {
                if (status === "success") {
                    setBookmark(true);
                }
            });
        }
    }

    return (
        <>
            <NextGenHeader />
            {loadingAd || !details.title ? (
                <AdViewSkeleton />
            ) : (
                <div className="grid grid-cols-1 max-w-[1200px] m-auto gap-8 p-5 md:grid-cols-2">
                    <ImageViwer imageList={images} />
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-[1fr_40px] items-center mb-4">
                            <h1 className="text-2xl font-bold mb-3">
                                {details.title}
                            </h1>
                            <button
                                className="btn btn-md btn-warning aspect-square p-0 rounded-full"
                                onClick={() => handleBookMarkChange()}
                            >
                                {bookmark ? (
                                    <BookMarkedIcon size={24} />
                                ) : (
                                    <BookmarkIcon size={24} />
                                )}
                            </button>
                        </div>
                        <p className="flex justify-between border-b border-gray-300">
                            <strong>Price</strong>{" "}
                            {details.price.toLocaleString()}{" "}
                            <CurrencyViewer name={details.currency.name} />
                        </p>
                        <p className="flex justify-between border-b border-gray-300">
                            <strong>Brand</strong> {details.brand.name}
                        </p>
                        <p className="flex justify-between border-b border-gray-300">
                            <strong>Color</strong> {details.color.name}
                        </p>
                        <p className="flex justify-between border-b border-gray-300">
                            <strong>Model</strong> {details.model}
                        </p>
                        <p className="flex justify-between border-b border-gray-300">
                            <strong>Year</strong> {details.year}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
