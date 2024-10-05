import { TrashIcon } from "lucide-react";
import { removeSavedAd } from "../../api/buyer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getImages } from "../../api/allUsers";
import CurrencyViewer from "../other/CurrencyViewer";
export default function AdCard({
    title,
    brand,
    model,
    color,
    price,
    year,
    currency,
    id,
    imageURLs,
    removeFormList,
}) {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getImages(imageURLs).then((result) => setImages(result.data));
    }, []);

    function handleRemoval() {
        removeSavedAd(id).then(({ status }) => {
            if (status === "success") {
                removeFormList(id);
            } else {
                console.error("Failed to remove saved ad");
            }
        });
    }

    return (
        <div className="card bg-base-100 w-full shadow-xl p-0 hover:shadow-2xl transition flex flex-col justify-between relative">
            <figure>
                {images[0] ? (
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full aspect-[16/9]  object-contain"
                    />
                ) : (
                    <div className="w-full aspect-[16/9] bg-gray-400"></div>
                )}
            </figure>
            <div className="card-body p-8 text-left">
                <div className="grid grid-cols-[1fr_40px]">
                    <Link to={`/ad-view/${id}`} className="w-full">
                        <h2 className="card-title mb-5 w-full">{title}</h2>
                    </Link>
                    <div>
                        <button
                            className="btn h-12 w-12 aspect-square rounded-full top-2 left-2 absloute p-0 btn-ghost"
                            onClick={handleRemoval}
                        >
                            <TrashIcon color="red" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row border-b border-gray-300 w-full justify-between items-center mb-2">
                    <span className="font-bold">Model</span>
                    <span>{model}</span>
                </div>
                <div className="flex flex-row border-b border-gray-300 w-full justify-between items-center mb-2">
                    <span className="font-bold">Brand</span>
                    <span>{brand}</span>
                </div>
                <div className="flex flex-row border-b border-gray-300 w-full justify-between items-center mb-2">
                    <span className="font-bold">Color</span>
                    <span>{color}</span>
                </div>
                <div className="flex flex-row border-b border-gray-300 w-full justify-between items-center mb-2">
                    <span className="font-bold">Year</span>
                    <span>{year}</span>
                </div>
                <div className="flex flex-row border-b border-gray-300 w-full justify-between items-center mb-2">
                    <span className="font-bold">Price</span>
                    <span className="text-yellow-500">
                        {price} <CurrencyViewer name={currency} />
                    </span>
                </div>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/ad-view/${id}`)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
