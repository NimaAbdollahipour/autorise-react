import { useContext, useEffect, useState } from "react";
import { getSavedAds } from "../api/buyer";
import { UserContext } from "../contexts/UserContext";
import ComplexSkeleton from "../components/skeletons/ComplexSkeleton";
import SavedAdCard from "../components/cards/SavedAdCard";
import CardContianer from "../components/other/CardContainer";
import NextGenHeader from "../components/headers/NextGenHeader";

export default function SavedAds() {
    const { userId } = useContext(UserContext);
    const [ads, setAds] = useState([]);
    const [loadingAds, setLoadingAds] = useState(false);

    useEffect(() => {
        if (userId) {
            getSavedAds(userId).then(({ status, data }) => {
                if (status == "success") {
                    setAds(data);
                    setLoadingAds(false);
                }
            });
        }
    }, [userId]);

    function removeFromList(id) {
        setAds(ads.filter((ad) => ad.id !== id));
    }

    return (
        <>
            <NextGenHeader />
            <div className="flex flex-col max-w-[1200px] m-auto gap-8 p-5">
                <CardContianer>
                    {loadingAds
                        ? Array(12)
                              .fill(0)
                              .map((_, index) => (
                                  <ComplexSkeleton key={index} />
                              ))
                        : ads.map((ad) => (
                              <SavedAdCard
                                  removeFormList={removeFromList}
                                  key={ad.id}
                                  title={ad.car_id.title}
                                  brand={ad.car_id.brand.name}
                                  model={ad.car_id.model}
                                  color={ad.car_id.color.name}
                                  price={ad.car_id.price.toLocaleString()}
                                  currency={ad.car_id.currency.name}
                                  imageURLs={ad.car_id.imageURLs}
                                  year={ad.car_id.year}
                                  id={ad.id}
                              />
                          ))}
                </CardContianer>
            </div>
        </>
    );
}
