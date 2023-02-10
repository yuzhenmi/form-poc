import { FieldProps } from "@/components/fields/field";
import React from "react";
import { FieldGroup } from "@/form/form";
import { TextField } from "./text";

export interface UserValue {
  firstName: string;
  lastName: string;
}

interface UserFieldProps extends Pick<FieldProps, "label"> {
  name: string;
}

export const UserField: React.FC<UserFieldProps> = ({ label, name }) => {
  return (
    <FieldGroup name={name}>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <TextField label="First Name" name="firstName" required />
        <TextField label="Last Name" name="lastName" required />
      </div>
    </FieldGroup>
  );
};
