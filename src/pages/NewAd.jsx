import { useContext, useEffect, useState } from "react";
import { getBrands, getColors, getCurrencies } from "../api/admin";
import ImageSelector from "../components/other/ImageSelector";
import LabeledInput from "../components/forms/LabeledInput";
import LabeledSelect from "../components/forms/LabeledSelect";
import { createAd, uploadImages } from "../api/seller";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import NextGenHeader from "../components/headers/NextGenHeader";

export default function NewAd() {
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const { userId } = useContext(UserContext);

    const navigate = useNavigate();

    const [details, setDetails] = useState({
        title: "",
        brand: 0,
        color: 0,
        model: "",
        year: 0,
        price: 0,
        currency: 0,
        imageURLs: [],
    });

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({
        year: false,
        price: false,
        currency: false,
        title: false,
        brand: false,
        color: false,
        model: false,
    });
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    function validateDetails() {
        setMessages([]);
        setErrors({
            year: false,
            price: false,
            currency: false,
            title: false,
            brand: false,
            color: false,
            model: false,
        });
        let isValid = true;
        if (details.brand === 0) {
            setErrors((prev) => ({ ...prev, brand: true }));
            isValid = false;
            setMessages((prev) => [...prev, "Please select the brand"]);
        }
        if (details.color === 0) {
            setErrors((prev) => ({ ...prev, color: true }));
            isValid = false;
            setMessages((prev) => [...prev, "Please select the color"]);
        }
        if (details.currency === 0) {
            setErrors((prev) => ({ ...prev, currency: true }));
            isValid = false;
            setMessages((prev) => [...prev, "Please select the currency"]);
        }
        if (details.title.trim() === "") {
            setErrors((prev) => ({ ...prev, title: true }));
            isValid = false;
            setMessages((prev) => [...prev, "Title can not be empty"]);
        }
        if (details.model.trim() === "") {
            setErrors((prev) => ({ ...prev, model: true }));
            isValid = false;
            setMessages((prev) => [...prev, "Model can not be empty"]);
        }
        if (
            !details.year ||
            parseInt(details.year) < 1900 ||
            parseInt(details.year) > new Date().getFullYear()
        ) {
            setErrors((prev) => ({ ...prev, year: true }));
            isValid = false;
            setMessages((prev) => [
                ...prev,
                `Year should be in 1900-${new Date().getFullYear()}`,
            ]);
        }
        if (
            !details.price ||
            parseInt(details.price) < 1 ||
            parseInt(details.price) > 10_000_000
        ) {
            setErrors((prev) => ({ ...prev, price: true }));
            isValid = false;
            setMessages((prev) => [
                ...prev,
                "Price must be between 1-100,000,000",
            ]);
        }
        return isValid;
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
    }, []);

    function handleChanges(event) {
        setDetails((prev) => ({
            ...prev,
            ...{ [event.target.name]: event.target.value },
        }));
    }

    function handleCreateAdWithImage() {
        if (validateDetails()) {
            createAd({ ...details, user_id: userId }).then(
                ({ status, data }) => {
                    if (status === "success") {
                        setUploading(true);
                        uploadImages(data.id, images, setProgress).then(
                            ({ status }) => {
                                if (status === "success") {
                                    navigate(`/ad-view/${data.id}`);
                                } else {
                                    setMessages([
                                        "Error while uploading images.",
                                    ]);
                                }
                            }
                        );
                    } else {
                        setMessages([
                            "Error while creating ad. Check if you have reached your limit (5).",
                        ]);
                    }
                }
            );
        }
    }

    function handleCreateAd() {
        if (validateDetails()) {
            createAd({ ...details, user_id: userId }).then(({ status }) => {
                if (status === "success") {
                    //navigate(`/ad-view/${data.id}`);
                } else {
                    setMessages([
                        "Error while creating ad. Check if you have reached your limit (5).",
                    ]);
                }
            });
        }
    }

    return (
        <div>
            <NextGenHeader />
            {step === 1 ? (
                <div className="flex flex-col max-w-[1200px] m-auto gap-8 p-5">
                    <h1 className="text-2xl font-bold">New Ad</h1>
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="col-span-1 sm:col-span-2 w-full grid grid-cols-1">
                            <LabeledInput
                                name="title"
                                label="title"
                                handleChange={handleChanges}
                                error={errors.title}
                                value={details.title}
                            />
                        </div>
                        <LabeledSelect
                            name="color"
                            handleChange={handleChanges}
                            error={errors.color}
                            label="color"
                            value={details.color}
                        >
                            <option value={0} disabled>
                                Select a color
                            </option>
                            {colors.map((color) => (
                                <option key={color.id} value={color.id}>
                                    {color.name}
                                </option>
                            ))}
                        </LabeledSelect>
                        <LabeledSelect
                            name="currency"
                            handleChange={handleChanges}
                            error={errors.currency}
                            label="currency"
                            value={details.currency}
                        >
                            <option value={0} disabled>
                                Select a color
                            </option>
                            {currencies.map((currency) => (
                                <option key={currency.id} value={currency.id}>
                                    {currency.name}
                                </option>
                            ))}
                        </LabeledSelect>
                        <LabeledSelect
                            name="brand"
                            handleChange={handleChanges}
                            error={errors.brand}
                            label="brand"
                            value={details.brand}
                        >
                            <option value={0} disabled>
                                Select a color
                            </option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </LabeledSelect>
                        <LabeledInput
                            name="model"
                            label="model"
                            handleChange={handleChanges}
                            error={errors.model}
                            value={details.model}
                        />
                        <LabeledInput
                            name="price"
                            label="price"
                            handleChange={handleChanges}
                            error={errors.price}
                            type="number"
                            value={details.price}
                        />
                        <LabeledInput
                            name="year"
                            label="year"
                            handleChange={handleChanges}
                            error={errors.year}
                            type="number"
                            value={details.year}
                        />
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => {
                                    if (validateDetails()) setStep(2);
                                }}
                                className="btn btn-warning"
                                type="button"
                            >
                                Add Images
                            </button>
                            <button
                                onClick={handleCreateAd}
                                className="btn btn-neutral"
                                type="button"
                            >
                                Create Without Image
                            </button>
                        </div>
                    </form>
                    <div>
                        {messages.map((message, index) => (
                            <div key={index} className="text-red-500 text-sm">
                                {message}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col max-w-[1200px] m-auto gap-8 p-5">
                    <h1 className="font-bold text-2xl">New Ad / Add Images</h1>
                    <ImageSelector images={images} setImages={setImages} />
                    {uploading && (
                        <div
                            className="radial-progress"
                            style={{ "--value": progress }}
                            role="progressbar"
                        >
                            {progress}%
                        </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleCreateAdWithImage}
                            className="btn btn-warning"
                            type="button"
                        >
                            Create Ad
                        </button>
                        <button
                            onClick={() => {
                                setStep(1);
                                setImages([]);
                            }}
                            type="button"
                            className="btn btn-neutral"
                        >
                            Change Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
