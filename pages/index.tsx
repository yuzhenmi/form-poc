import Head from "next/head";
import { Form } from "@/form/form";
import { useState } from "react";
import { UserField, UserValue } from "@/components/fields/user";
import { UsersField } from "@/components/fields/users";

interface Value {
  user: UserValue;
  users: UserValue[];
}

export default function Home() {
  const [value, setValue] = useState<Value>({
    user: { firstName: "", lastName: "" },
    users: [],
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              maxWidth: "800px",
              padding: "32px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Field Group Demo
              </div>
              <UserField label="User" name="user" />
            </div>
            <hr />
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Field Group List Demo
              </div>
              <UsersField label="Users" name="users" />
            </div>
          </div>
        </Form>
      </main>
    </>
  );
}
