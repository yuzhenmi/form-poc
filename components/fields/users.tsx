import { FieldProps } from '@/components/fields/field';
import React, { useMemo } from 'react';
import { FieldGroupList, useField } from '@/form/form';
import { TextField } from './text';

export interface UserValue {
    firstName: string;
    lastName: string;
}

interface UsersFieldProps extends Pick<FieldProps, 'label'> {
    name: string;
}

export const UsersField: React.FC<UsersFieldProps> = ({ label, name }) => {
    const validators = useMemo(() => [], []);
    const { value, onChange, errors } = useField<UserValue[]>(name, { validators });
    return (
        <FieldGroupList value={value} onChange={}>
            <TextField label="First Name" name="firstName" required />
            <TextField label="Last Name" name="lastName" />
        </FieldGroupList>
    );
};
