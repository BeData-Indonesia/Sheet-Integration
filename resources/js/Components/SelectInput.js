import React from "react";

export default function SelectInput({ options, name, id, ...props }) {
    return (
        <select
            name={name}
            id={id}
            {...props}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        >
            <option></option>
            {options.map((option) => {
                return (
                    <option value={option.value || option.name}>
                        {option.name}
                    </option>
                );
            })}
        </select>
    );
}
