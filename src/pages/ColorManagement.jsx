import { useEffect, useState } from "react";
import { getColors } from "../api/admin";
import SimpleCardSkeleton from "../components/skeletons/SimpleCardSkeleton";
import SimpleCard from "../components/cards/SimpleCard";
import { supabase } from "../api/supabaseClient";
import NextGenHeader from "../components/headers/NextGenHeader";

export default function ColorManagement() {
    const [colors, setColors] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [newValue, setNewValue] = useState("");

    useEffect(() => {
        setLoadingUsers(true);
        getColors().then(({ status, data }) => {
            if (status === "success") {
                setColors(data);
                setLoadingUsers(false);
            }
        });
    }, []);

    function createNewItem() {
        supabase
            .from("colors")
            .insert({ name: newValue })
            .select("id")
            .then(({ error, data }) => {
                if (error) {
                    console.error(error);
                } else {
                    setColors([...colors, { id: data[0].id, name: newValue }]);
                }
            });
    }

    function removeFromList(id) {
        setColors((prev) => prev.filter((item) => item.id !== id));
    }

    return (
        <div>
            <NextGenHeader />
            <div className="flex flex-col max-w-[1200px] m-auto gap-3 p-5">
                <div className="flex flex-row gap-3">
                    <input
                        className="input input-bordered flex-1"
                        placeholder="New color"
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
                    : colors.map((item) => (
                          <SimpleCard
                              title={item.name}
                              id={item.id}
                              table="colors"
                              key={item.id}
                              removeFromList={removeFromList}
                          />
                      ))}
            </div>
        </div>
    );
}
