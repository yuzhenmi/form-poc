import React from 'react';

export interface FieldProps {
    label: string;
    errors: string[];
    children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, errors, children }) => {
    return (
        <div>
            <div>{label}</div>
            <div>{children}</div>
            <div>
                {errors.map((error, errorIndex) => (
                    <div key={errorIndex}>{error}</div>
                ))}
            </div>
        </div>
    );
};
