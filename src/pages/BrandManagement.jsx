import { useEffect, useState } from "react";
import { getBrands } from "../api/admin";
import SimpleCardSkeleton from "../components/skeletons/SimpleCardSkeleton";
import SimpleCard from "../components/cards/SimpleCard";
import { supabase } from "../api/supabaseClient";
import NextGenHeader from "../components/headers/NextGenHeader";

export default function BrandManagement() {
    const [brands, setBrands] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [newValue, setNewValue] = useState("");

    useEffect(() => {
        setLoadingUsers(true);
        getBrands().then(({ status, data }) => {
            if (status === "success") {
                setBrands(data);
                setLoadingUsers(false);
            }
        });
    }, []);

    function createNewItem() {
        supabase
            .from("brands")
            .insert({ name: newValue })
            .select("id")
            .then(({ error, data }) => {
                if (error) {
                    console.error(error);
                } else {
                    setBrands([...brands, { id: data[0].id, name: newValue }]);
                }
            });
    }

    function removeFromList(id) {
        setBrands((prev) => prev.filter((item) => item.id !== id));
    }

    return (
        <div>
            <NextGenHeader />
            <div className="flex flex-col max-w-[1200px] m-auto gap-3 p-5">
                <div className="flex flex-row gap-3">
                    <input
                        className="input input-bordered flex-1"
                        placeholder="New brand"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                    <button className="btn btn-warning" onClick={createNewItem}>
                        Add
                    </button>
                </div>
                {loadingUsers
                    ? Array(12)
                          .fill(0)
                          .map((_, index) => <SimpleCardSkeleton key={index} />)
                    : brands.map((item) => (
                          <SimpleCard
                              title={item.name}
                              id={item.id}
                              table="brands"
                              key={item.id}
                              removeFromList={removeFromList}
                          />
                      ))}
            </div>
        </div>
    );
}
