import { useContext, useEffect, useState } from "react";
import AdCard from "../components/cards/AdCard";
import CardContianer from "../components/other/CardContainer";
import AdCardSkeleton from "../components/skeletons/AdCardSkeleton";
import NextGenHeader from "../components/headers/NextGenHeader";
import { UserContext } from "../contexts/UserContext";
import { getMyAds } from "../api/seller";
import MyAdCard from "../components/cards/MyAdCard";

export default function MyAds() {
    const [ads, setAds] = useState([]);
    const [loadingAds, setLoadingAds] = useState(true);

    const { userId } = useContext(UserContext);

    useEffect(() => {
        getMyAds(userId).then(({ status, data }) => {
            if (status === "success") {
                setAds(data);
                setLoadingAds(false);
            }
        });
    }, []);

    function removeFromList(id) {
        setAds((prev) => prev.filter((ad) => ad.id !== id));
    }

    return (
        <div>
            <NextGenHeader />
            <div className="flex flex-col max-w-[1200px] m-auto gap-8 p-5">
                <CardContianer>
                    {loadingAds
                        ? Array(12)
                              .fill(0)
                              .map((item, index) => (
                                  <AdCardSkeleton key={index} />
                              ))
                        : ads.map((ad) => (
                              <MyAdCard
                                  key={ad.id}
                                  title={ad.title}
                                  brand={ad.brand.name}
                                  color={ad.color.name}
                                  price={ad.price.toLocaleString()}
                                  year={ad.year}
                                  model={ad.model}
                                  id={ad.id}
                                  currency={ad.currency.name}
                                  imageURLs={ad.imageURLs}
                                  removeFromList={removeFromList}
                              />
                          ))}
                    {}
                </CardContianer>
            </div>
        </div>
    );
}
