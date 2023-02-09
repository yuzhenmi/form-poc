import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { validateMaxLength, validateMinLength } from './validators';

export interface Validator {
    validate: (value: unknown, formValue: any) => boolean | null;
    message: string;
}

export interface Field {
    name: string;
    validators: Validator[];
}

interface FieldErrors {
    [fieldName: string]: string[];
};

interface Value<TValue extends object> {
    registerField: (fieldName: string, field: Field) => (() => void);
    value: TValue;
    setFieldValue: (fieldName: string, fieldValue: any) => void;
    fieldErrors: FieldErrors;
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

    const [fields, setFields] = useState<{ [name: string]: Field }>({});
    const registerField = useCallback((name: string, field: Field) => {
        setFields((prevState) => ({ ...prevState, [name]: field }));
        return () => {
            setFields((prevState) => {
                const newState = { ...prevState };
                delete newState[name];
                return newState;
            });
        };
    }, []);

    const fieldErrors: any = {};
    for (const fieldName of Object.keys(fields)) {
        const fieldValue = (value as any)[fieldName];
        const field = fields[fieldName];
        const messages: string[] = [];
        if (field) {
            for (const validator of field.validators) {
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
                registerField,
                value,
                setFieldValue,
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

export function useField<TValue>(name: string, field: Field) {
    const { registerField, value, setFieldValue, fieldErrors } = useFormValue();

    const onChange = useCallback((value: TValue) => {
        setFieldValue(name, value);
    }, [name, setFieldValue]);

    useEffect(() => {
        const unregister = registerField(name, field);
        return unregister;
    }, [registerField, name, field]);

    return {
        value: value[name] as TValue,
        onChange,
        errors: fieldErrors[name] ?? [],
    };
}

interface FieldGroupProps<TValue> {
    name: string;
    validators?: Validator[];
    children: React.ReactNode | (
        (fieldState: {
            value: TValue;
            errors: string[];
        }) => React.ReactNode
    );
}

export function FieldGroup<TValue>({
    name: ownName,
    validators = [],
    children,
}: FieldGroupProps<TValue>) {
    const {
        registerField: registerOwnField,
        value: parentValue,
        setFieldValue: setOwnFieldValue,
        fieldErrors: parentFieldErrors,
    } = useFormValue();

    const field = useMemo(() => ({ name: ownName, validators }), [ownName, validators]);
    useEffect(() => {
        const unregister = registerOwnField(ownName, field);
        return unregister;
    }, [registerOwnField, ownName, field]);

    const parentValueRef = useRef(parentValue);
    parentValueRef.current = parentValue;
    const setFieldValue = useCallback((name: string, value: TValue) => {
        setOwnFieldValue(ownName, {...parentValueRef.current, [name]: value});
    }, [ownName, setOwnFieldValue]);

    const ownValue = parentValue[ownName] as TValue;

    const [fields, setFields] = useState<{ [name: string]: Field }>({});
    const registerField = useCallback((name: string, field: Field) => {
        setFields((prevState) => ({ ...prevState, [name]: field }));
        return () => {
            setFields((prevState) => {
                const newState = { ...prevState };
                delete newState[name];
                return newState;
            });
        };
    }, []);

    const fieldErrors: any = {};
    for (const fieldName of Object.keys(fields)) {
        const fieldValue = (ownValue as any)[fieldName];
        const field = fields[fieldName];
        const messages: string[] = [];
        if (field) {
            for (const validator of field.validators) {
                if (validator.validate(fieldValue, ownValue) === false) {
                    messages.push(validator.message);
                }
            }
        }
        fieldErrors[fieldName] = messages;
    }

    return (
        <context.Provider
            value={{
                registerField,
                value: ownValue,
                setFieldValue,
                fieldErrors,
            }}
        >{typeof children === 'function' ? children({
            value: ownValue,
            errors: parentFieldErrors[ownName],
        }) : children}</context.Provider>
    );
}
