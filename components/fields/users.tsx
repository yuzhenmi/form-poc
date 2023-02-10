import { Field, FieldProps } from "@/components/fields/field";
import React, { useCallback, useMemo } from "react";
import { FieldGroupList } from "@/form/form";
import { UserField, UserValue } from "./user";
import { validateMinLength } from "@/form/validators";

interface UsersFieldProps extends Pick<FieldProps, "label"> {
  name: string;
}

export const UsersField: React.FC<UsersFieldProps> = ({ label, name }) => {
  const getItemName = useCallback((user: UserValue, userIndex: number) => {
    return userIndex.toString();
  }, []);
  const validators = useMemo(() => [validateMinLength(1)], []);
  return (
    <FieldGroupList<UserValue>
      name={name}
      getItemName={getItemName}
      validators={validators}
    >
      {({ value, errors, onChange }) => (
        <Field label={label} errors={errors}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {value.map((user, userIndex) => (
              <div key={userIndex} style={{ display: "flex", gap: "16px" }}>
                <UserField label="User" name={getItemName(user, userIndex)} />
                <div style={{ paddingTop: "24px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ffffff",
                      fontSize: "14px",
                      border: "1px solid #666666",
                      borderRadius: "4px",
                    }}
                    onClick={() => {
                      onChange(value.filter((u) => u !== user));
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#ffffff",
                  fontSize: "14px",
                  border: "1px solid #666666",
                  borderRadius: "4px",
                }}
                onClick={() => {
                  onChange([...value, { firstName: "", lastName: "" }]);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </Field>
      )}
    </FieldGroupList>
  );
};
