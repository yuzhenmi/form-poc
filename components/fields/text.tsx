import { Field, FieldProps } from '@/components/fields/field';
import React, { useMemo } from 'react';
import { useField, Validator } from '@/form/form';
import { validateRequired, validateString } from '@/form/validators';

interface TextFieldProps extends Pick<FieldProps, 'label'> {
    name: string;
    required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ label, name, required = false }) => {
    const field = useMemo(() => {
        const validators: Validator[] = [
            validateString(),
        ];
        if (required) {
            validators.push(validateRequired());
        }
        return {
            name,
            validators,
        };
    }, [name, required]);
    const { value, onChange, errors } = useField<string>(name, field);
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
