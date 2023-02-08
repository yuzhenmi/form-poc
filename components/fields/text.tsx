import { Field, FieldProps } from '@/components/fields/field';
import React, { useMemo } from 'react';
import { useField } from '@/form/form';
import { validateRequired, validateString } from '@/form/validators';

interface TextFieldProps extends Pick<FieldProps, 'label'> {
    name: string;
    required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ label, name, required = false }) => {
    const validators = useMemo(() => [
        validateString(),
        required && validateRequired(),
    ], [required]);
    const { value, onChange, errors } = useField<string>(name, { validators });
    return (
        <Field label={label} errors={errors}>
            <input
                value={value}
                onChange={(event) => {
                    onChange(event.target.value);
                }}
            />
        </Field>
    );
};
