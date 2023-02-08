import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { validateMaxLength, validateMinLength } from './validators';

export interface Validator {
    validate: (value: unknown, formValue: any) => boolean | null;
    message: string;
}

interface Value<TValue extends object> {
    value: TValue;
    setFieldValue: (fieldName: string, fieldValue: any) => void;
    registerFieldValidators: (fieldName: string, validators: (Validator)[]) => (() => void);
    fieldErrors: {
        [fieldName in keyof TValue]: string[];
    };
}

const context = React.createContext<Value<any> | null>(null);

interface FormProps<TValue> {
    value: TValue;
    onChange: (value: TValue) => void;
    children: React.ReactNode;
}

export function Form<TValue>({ value, onChange, children }: FormProps<TValue>) {
    const changes: any = {};
    const setFieldValue = (fieldName: string, fieldValue: any) => {
        changes[fieldName] = fieldValue;
        onChange({ ...value, ...changes });
    };

    const [fieldValidators, setFieldValidators] = useState<{ [fieldName: string]: Validator[] }>({});
    const registerFieldValidators = useCallback((fieldName: string, validators: Validator[]) => {
        setFieldValidators((prevState) => ({ ...prevState, [fieldName]: validators }));
        return () => {
            setFieldValidators((prevState) => {
                const newState = { ...prevState };
                delete newState[fieldName];
                return newState;
            });
        };
    }, []);

    const fieldErrors: any = {};
    for (const fieldName of Object.keys(fieldValidators)) {
        const fieldValue = (value as any)[fieldName];
        const validators = fieldValidators[fieldName];
        const messages: string[] = [];
        if (validators) {
            for (const validator of validators) {
                if (validator.validate(fieldValue, value) === false) {
                    messages.push(validator.message);
                }
            }
        }
        fieldErrors[fieldName] = messages;
    }

    return (
        <context.Provider
            value={{
                value,
                setFieldValue,
                registerFieldValidators,
                fieldErrors,
            }}
        >{children}</context.Provider>
    );
};

function useFormValue() {
    const value = useContext(context);
    if (!value) {
        throw new Error('Form is not mounted.');
    }
    return value;
}

interface FieldOptions {
    validators?: (Validator | false | null | undefined)[];
}

export function useField<TValue>(name: string, {
    validators: rawValidators = [],
}: FieldOptions = {}) {
    const { value, setFieldValue, registerFieldValidators, fieldErrors } = useFormValue();
    if (value[name] === undefined) {
        throw new Error(`Field ${name} is undefined in form value.`);
    }

    const onChange = useCallback((value: TValue) => {
        setFieldValue(name, value);
    }, [name, setFieldValue]);

    let validators = rawValidators.filter(Boolean) as Validator[];
    const validatorsRef = useRef(validators);
    const validatorsNotUpdated = validatorsRef.current.length === validators.length && validatorsRef.current.every((v, index) => v === validators[index]);
    validators = validatorsNotUpdated ? validatorsRef.current : validators;
    validatorsRef.current = validators;
    useEffect(() => {
        const unregister = registerFieldValidators(name, validators);
        return unregister;
    }, [registerFieldValidators, name, validators]);

    return {
        value: value[name] as TValue,
        onChange,
        errors: fieldErrors[name] ?? [],
    };
}

interface FieldGroupListProps<TValue> {
    value: TValue[];
    onChange: (value: TValue) => void;
    children: React.ReactNode;
}

export function FieldGroupList<TValue>({ children }: FieldGroupListProps<TValue>) {
    return (
        <context.Provider
            value={{
                value: {},
                setFieldValue: () => null,
                registerFieldValidators: () => () => null,
                fieldErrors: {},
            }}
        >{children}</context.Provider>
    );
}
