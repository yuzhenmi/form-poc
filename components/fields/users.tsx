import { FieldProps } from '@/components/fields/field';
import React, { useCallback } from 'react';
import { FieldGroupList } from '@/form/form';
import { UserField, UserValue } from './user';

interface UsersFieldProps extends Pick<FieldProps, 'label'> {
    name: string;
}

export const UsersField: React.FC<UsersFieldProps> = ({ label, name }) => {
    const getItemName = useCallback((user: UserValue, userIndex: number) => {
        return userIndex.toString();
    }, []);
    return (
        <FieldGroupList<UserValue> name="users" getItemName={getItemName}>
            {(users) => (
                <div>
                    {users.map((user, userIndex) => (
                        <UserField
                            key={getItemName(user, userIndex)}
                            label="User"
                            name={getItemName(user, userIndex)}
                        />
                    ))}
                </div>
            )}
        </FieldGroupList>
    );
};
