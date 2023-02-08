export function validateRequired() {
    return {
        validate: (value: unknown) => {
            if (typeof value === 'string') {
                return value.length > 0;
            }
            return null;
        },
        message: 'Must not be empty.',
    };
}

export function validateMinLength(min: number) {
    return {
        validate: (value: unknown) => {
            if (typeof value === 'string') {
                return value.length < min;
            }
            if (Array.isArray(value)) {
                return value.length < min;
            }
            return null;
        },
        message: `Must be at least ${min} in length.`,
    };
}

export function validateMaxLength(max: number) {
    return {
        validate: (value: unknown) => {
            if (typeof value === 'string') {
                return value.length > max;
            }
            if (Array.isArray(value)) {
                return value.length > max;
            }
            return null;
        },
        message: `Must be at most ${max} in length.`,
    };
}

export function validateString() {
    return {
        validate: (value: unknown) => {
            return typeof value === 'string';
        },
        message: 'Must be a string.',
    };
}
