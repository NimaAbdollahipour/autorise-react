import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function SearchBar({
    currentFilters,
    applyFilters,
    brands,
    colors,
}) {
    const [openFilters, setOpenFilters] = useState(false);
    const [filters, setFilters] = useState(currentFilters);

    function handleChanges(e) {
        const { name, value } = e.target;
        let parsedValue;
        if (name !== "q") {
            parsedValue = parseInt(value);
            setFilters({ ...filters, [name]: parsedValue });
        } else {
            setFilters({ ...filters, [name]: value });
        }
    }

    return (
        <>
            <div className="flex flex-row items-center gap-3">
                <input
                    type="text"
                    placeholder="Search by title or model ..."
                    className="input input-bordered flex-1"
                    onChange={handleChanges}
                    value={filters.q}
                    name="q"
                />
                <button
                    className="btn btn-warning aspect-square p-0 sm:aspect-auto sm:p-2"
                    onClick={() => applyFilters(filters)}
                >
                    <SearchIcon />
                    <span className="hidden sm:block">Search</span>
                </button>
            </div>
            <div className="collapse collapse-arrow border">
                <div className="p-5 flex flex-row justify-between">
                    <span className="font-bold">Filters</span>
                    <label className="swap swap-rotate">
                        <input
                            type="checkbox"
                            value={openFilters}
                            onChange={(e) => setOpenFilters((prev) => !prev)}
                        />
                        <FilterIcon color="black" className="swap-off" />
                        <XIcon color="black" className="swap-on" />
                    </label>
                </div>
                {openFilters && (
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="grid grid-cols-1 w-full">
                            <label className="font-bold">Minimum Price</label>
                            <input
                                type="number"
                                min={0}
                                max={10_000_000}
                                placeholder="min. price"
                                className="input input-bordered"
                                onChange={handleChanges}
                                value={filters.minPrice}
                                name="minPrice"
                            />
                        </div>
                        <div className="grid grid-cols-1 w-full gap-2">
                            <label className="font-bold">Maximum Price</label>
                            <input
                                type="number"
                                min={0}
                                max={10_000_000}
                                placeholder="max. price"
                                className="input input-bordered"
                                onChange={handleChanges}
                                value={filters.maxPrice}
                                name="maxPrice"
                            />
                        </div>
                        <div className="grid grid-cols-1 w-full gap-2">
                            <label className="font-bold">From Year</label>
                            <input
                                type="number"
                                min={1900}
                                max={new Date().getFullYear()}
                                placeholder="from year"
                                className="input input-bordered"
                                onChange={handleChanges}
                                value={filters.fromYear}
                                name="fromYear"
                            />
                        </div>
                        <div className="grid grid-cols-1 w-full gap-2">
                            <label className="font-bold">To Year</label>
                            <input
                                type="number"
                                min={1900}
                                max={new Date().getFullYear()}
                                placeholder="to year"
                                className="input input-bordered"
                                onChange={handleChanges}
                                value={filters.toYear}
                                name="toYear"
                            />
                        </div>
                        <div className="grid grid-cols-1 w-full gap-2">
                            <label className="font-bold">Brand</label>
                            <select
                                className="select select-bordered w-full"
                                onChange={handleChanges}
                                value={filters.brand}
                                name="brand"
                            >
                                <option value={0}>Brand</option>
                                {brands.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 w-full gap-2">
                            <label className="font-bold">Color</label>
                            <select
                                className="select select-bordered w-full"
                                onChange={handleChanges}
                                value={filters.color}
                                name="color"
                            >
                                <option value={0}>Color</option>
                                {colors.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end col-span-1 sm:col-span-2">
                            <button
                                className="btn btn-warning"
                                onClick={() => {
                                    applyFilters(filters);
                                }}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
