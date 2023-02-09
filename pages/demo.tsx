import Head from 'next/head'
import { FieldGroupList, Form } from '@/form/form'
import { useState } from 'react'
import { UserField, UserValue } from '@/components/fields/user';
import { UsersField } from '@/components/fields/users';

interface Value {
    user: UserValue,
    users: UserValue[],
}

export default function Demo() {
    const [value, setValue] = useState<Value>({
        user: { firstName: '', lastName: '' },
        users: [
            { firstName: '', lastName: '' },
            { firstName: '', lastName: '' },
            { firstName: '', lastName: '' },
        ],
    });
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Form<Value> value={value} onChange={setValue}>
                    <UserField label="User" name="user" />
                    <UsersField label="Users" name="users" />
                </Form>
            </main>
        </>
    )
}
