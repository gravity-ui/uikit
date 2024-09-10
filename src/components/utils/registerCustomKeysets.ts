import type {KeysetData} from '@gravity-ui/i18n';

import {i18n} from '../../i18n';

export const registerCustomKeysets = (language: string, data: KeysetData) => {
    validateCustomKeysets(language, data);
    i18n.registerKeysets(language, data);
};

function validateCustomKeysets(language: string, data: KeysetData): void {
    const trustedData = i18n.data.en;

    Object.keys(trustedData).forEach((componentName) => {
        Object.keys(trustedData[componentName]).forEach((keyName) => {
            if (data[componentName] === undefined) {
                throw createCustomKeysetsValidationError(
                    language,
                    `keyset for component '${componentName}' is required`,
                );
            }
            if (data[componentName][keyName] === undefined) {
                throw createCustomKeysetsValidationError(
                    language,
                    `key '${keyName}' for component '${componentName}' is required`,
                );
            }
        });
    });
}

function createCustomKeysetsValidationError(language: string, text: string): Error {
    return new Error(`Custom keysets '${language}' validation error: ${text}`);
}
