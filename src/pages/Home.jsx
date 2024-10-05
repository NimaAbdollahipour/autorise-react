import { useEffect, useState } from "react";
import AdCard from "../components/cards/AdCard";
import CardContianer from "../components/other/CardContainer";
import SearchBar from "../components/other/SearchBar";
import AdCardSkeleton from "../components/skeletons/AdCardSkeleton";
import { getAllAds } from "../api/allUsers";
import { getBrands, getColors } from "../api/admin";
import NextGenHeader from "../components/headers/NextGenHeader";

export default function Home() {
    const [ads, setAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingAds, setLoadingAds] = useState(true);

    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);

    const [filters, setFilters] = useState({
        q: "",
        minPrice: 0,
        maxPrice: 10_000_000,
        fromYear: 1900,
        toYear: new Date().getFullYear(),
        brand: 0,
        color: 0,
    });

    function handlePagination(direction) {
        if (
            (direction === 1 && currentPage === totalPages) ||
            (direction === -1 && currentPage === 1)
        )
            return;
        setCurrentPage((page) => page + direction);
    }

    useEffect(() => {
        getColors().then(({ status, data }) => {
            if (status === "success") {
                setColors(data);
            }
        });
        getBrands().then(({ status, data }) => {
            if (status === "success") {
                setBrands(data);
            }
        });
    }, []);

    useEffect(() => {
        setLoadingAds(true);
        getAllAds(currentPage - 1, filters, filters.q).then(
            ({ status, data, count }) => {
                if (status === "success") {
                    setAds(data);
                    setLoadingAds(false);
                    setTotalPages(Math.ceil(count / 12));
                }
            }
        );
    }, [filters, currentPage]);

    return (
        <div>
            <NextGenHeader />
            <div className="flex flex-col max-w-[1200px] m-auto gap-8 p-5">
                <SearchBar
                    applyFilters={setFilters}
                    currentFilters={filters}
                    brands={brands}
                    colors={colors}
                />
                <CardContianer>
                    {loadingAds
                        ? Array(12)
                              .fill(0)
                              .map((item, index) => (
                                  <AdCardSkeleton key={index} />
                              ))
                        : ads.map((ad) => (
                              <AdCard
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
                              />
                          ))}
                    {}
                </CardContianer>
                <div className="my-5 flex w-full justify-center">
                    <div className="join">
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(-1)}
                        >
                            «
                        </button>
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(0)}
                        >
                            Page {currentPage}
                        </button>
                        <button
                            className="join-item btn btn-neutral"
                            onClick={() => handlePagination(1)}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
