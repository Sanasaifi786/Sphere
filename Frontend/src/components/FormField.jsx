import React from 'react';

const FormField = ({ id, label, type, placeholder, required, ariaLabel, value, onChange, name }) => {
    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                aria-label={ariaLabel}
                name={name}
                value={value}
                onChange={onChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
};

export default FormField;
