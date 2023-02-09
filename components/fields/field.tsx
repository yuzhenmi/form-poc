import React from 'react';

export interface FieldProps {
    label: string;
    errors: string[];
    children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, errors, children }) => {
    return (
        <div>
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>{label}</div>
            <div>{children}</div>
            {errors.length > 0 && (
                <div>
                    {errors.map((error, errorIndex) => (
                        <div
                            key={errorIndex}
                            style={{
                                marginTop: '4px',
                                fontSize: '14px',
                                color: '#ff0000',
                            }}
                        >
                            {error}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
