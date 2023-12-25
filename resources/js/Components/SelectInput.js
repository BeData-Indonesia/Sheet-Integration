import React from "react";

export default function SelectInput({ options, name, id, ...props }) {
    return (
        <select name={name} id={id} {...props}>
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
