import { useState } from "react";
import { CheckIcon, PenIcon, TrashIcon, XIcon } from "lucide-react";
import { updateBrand, updateColor } from "../../api/admin";
import { supabase } from "../../api/supabaseClient";

export default function SimpleCard({ title, id, removeFromList, table }) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(title);
    const [beforeChange, setBeforeChange] = useState();

    function updateItem() {
        supabase
            .from(table)
            .update({ name: value })
            .eq("id", id)
            .then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    //toast
                }
            });
    }

    function deleteItem() {
        supabase
            .from(table)
            .delete()
            .eq("id", id)
            .then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    removeFromList(id);
                    //toast
                }
            });
    }

    return (
        <div className="card bg-base-100 w-full shadow-xl p-3 hover:shadow-2xl transition">
            <div className="flex flex-row justify-between items-center">
                {edit ? (
                    <input
                        value={value}
                        className="input input-bordered"
                        onChange={(e) => setValue(e.target.value)}
                    />
                ) : (
                    <h2 className="px-2">{value}</h2>
                )}
                <div className="flex flex-row">
                    {edit ? (
                        <>
                            <button
                                className="btn btn-link"
                                onClick={() => {
                                    setEdit(false);
                                    setValue(beforeChange);
                                }}
                            >
                                <XIcon color="black" />
                            </button>
                            <button
                                className="btn btn-link"
                                onClick={() => {
                                    setEdit(false);
                                    updateItem();
                                }}
                            >
                                <CheckIcon color="green" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-link"
                                onClick={() => {
                                    setEdit(true);
                                    setBeforeChange(value);
                                }}
                            >
                                <PenIcon color="black" />
                            </button>
                            <button
                                className="btn btn-link"
                                onClick={deleteItem}
                            >
                                <TrashIcon color="red" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
