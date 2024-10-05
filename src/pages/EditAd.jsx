import { useEffect, useRef, useState } from "react";
import { getBrands, getColors, getCurrencies } from "../api/admin";
import { useNavigate, useParams } from "react-router-dom";
import NextGenHeader from "../components/headers/NextGenHeader";
import { supabase } from "../api/supabaseClient";
import EditableInput from "../components/forms/EditableInput";
import { getAdDetails } from "../api/buyer";
import { LoaderIcon } from "lucide-react";
import { Toast } from "primereact/toast";
import EditableSelect from "../components/forms/EditableSelect";

export default function EditAd() {
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [details, setDetails] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const toastRef = useRef(null);

    const navigate = useNavigate();

    function validateDetails(name, value) {
        if (("" + value).trim() === "") {
            return false;
        } else if (
            name === "year" &&
            (parseInt(value) > new Date().getFullYear() ||
                parseInt(value) < 1900)
        ) {
            return false;
        } else if (
            name === "year" &&
            (parseInt(value) > 10_000_000 || parseInt(value) < 1)
        ) {
            return false;
        }

        return true;
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
        getCurrencies().then(({ status, data }) => {
            if (status === "success") {
                setCurrencies(data);
            }
        });
        getAdDetails(parseInt(id)).then(({ status, data }) => {
            if (status === "success") {
                setDetails(data);
                setLoading(false);
            }
        });
    }, []);

    function handleUpdateAd(name, value) {
        if (validateDetails(name, value)) {
            supabase
                .from("cars")
                .update({ [name]: value })
                .eq("id", parseInt(id))
                .then(({ error, data }) => {
                    if (error) {
                        toastRef.current.show([
                            {
                                severity: "error",
                                summary: "Error",
                                detail: "Error Updating",
                                life: 3000,
                            },
                        ]);
                    } else {
                        toastRef.current.show([
                            {
                                severity: "success",
                                summary: "Success",
                                detail: "Updated Successfully",
                                life: 3000,
                            },
                        ]);
                    }
                });
        }
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
                <div className="grid grid-cols-1 max-w-[1200px] m-auto gap-8 p-5 sm:grid-cols-2  bg-white mt-5 rounded-lg">
                    <EditableInput
                        initialValue={details.title}
                        name={"title"}
                        label={"title"}
                        changeAction={handleUpdateAd}
                    />
                    <EditableInput
                        initialValue={details.model}
                        name={"model"}
                        label={"model"}
                        changeAction={handleUpdateAd}
                    />
                    <EditableInput
                        initialValue={details.year}
                        name={"year"}
                        label={"year"}
                        type={"number"}
                        changeAction={handleUpdateAd}
                    />
                    <EditableInput
                        initialValue={details.price}
                        name={"price"}
                        label={"price"}
                        type={"number"}
                        changeAction={handleUpdateAd}
                    />
                    <EditableSelect
                        initialValue={details.brand}
                        name={"brand"}
                        label={"brand"}
                        changeAction={handleUpdateAd}
                    >
                        {brands.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </EditableSelect>
                    <EditableSelect
                        initialValue={details.currency}
                        name={"currency"}
                        label={"currency"}
                        changeAction={handleUpdateAd}
                    >
                        {currencies.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </EditableSelect>
                    <EditableSelect
                        initialValue={details.color}
                        name={"color"}
                        label={"color"}
                        changeAction={handleUpdateAd}
                    >
                        {colors.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </EditableSelect>
                    <div className="h-[100%] flex flex-col justify-end">
                        <div>
                            <button
                                className="btn btn-neutral"
                                onClick={() =>
                                    navigate(`/seller/edit-images/${id}`)
                                }
                            >
                                Add or Delete Images
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
