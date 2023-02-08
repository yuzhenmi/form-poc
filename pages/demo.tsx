import Head from 'next/head'
import { Form } from '@/form/form'
import { useState } from 'react'
import { UsersField, UserValue } from '@/components/fields/users';

interface Value {
    users: UserValue[],
}

export default function Demo() {
    const [value, setValue] = useState<Value>({ users: [] });
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
                    <UsersField label="Users" name="users" />
                </Form>
            </main>
        </>
    )
}