import { CheckIcon, PenIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function EditableSelect({
    changeAction,
    initialValue,
    name,
    label,
    children,
}) {
    const [editing, setEditiong] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);
    const [beforeChange, setBeforeChange] = useState(initialValue);
    return (
        <div className="grid grid-cols-1 gap-2">
            <div className="flex flex-row gap-2 items-center w-full justify-between">
                <label className="font-bold" htmlFor={name}>
                    {label}
                </label>
                {editing ? (
                    <div className="flex flex-row gap-2 items-center">
                        <button
                            className="btn btn-ghost btn-circle btn-md"
                            onClick={() => {
                                setEditiong(false);
                                setInputValue(beforeChange);
                            }}
                        >
                            <XIcon />
                        </button>
                        <button
                            className="btn btn-ghost btn-circle btn-md"
                            onClick={() => {
                                setEditiong(false);
                                changeAction(name, inputValue);
                            }}
                        >
                            <CheckIcon />
                        </button>
                    </div>
                ) : (
                    <button
                        className="btn btn-ghost btn-circle btn-md"
                        onClick={() => {
                            setEditiong(true);
                            setBeforeChange(inputValue);
                        }}
                    >
                        <PenIcon />
                    </button>
                )}
            </div>
            <select
                name={name}
                id={name}
                disabled={!editing}
                className="select select-bordered"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            >
                {children}
            </select>
        </div>
    );
}
