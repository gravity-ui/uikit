import type {KeysetData} from '@gravity-ui/i18n';

import {i18n} from '../../i18n';

export const registerCustomKeysets = (language: string, data: KeysetData) => {
    validateCustomKeysets(language, data);
    i18n.registerKeysets(language, data);
};

function validateCustomKeysets(language: string, data: KeysetData): void {
    const trustedData = i18n.data.en;

    const trustedComponents = Object.keys(trustedData);
    const customComponents = Object.keys(data);

    trustedComponents.forEach((componentName) => {
        const trustedKeys = Object.keys(trustedData[componentName]);
        const customKeys = Object.keys(data[componentName]);

        // Check that all component keys in trusted data exist in data
        trustedKeys.forEach((keyName) => {
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

        // Check for extra component keys
        if (trustedKeys.length !== customKeys.length) {
            const keyDifference = getArrayDifference(trustedKeys, customKeys);
            throw createCustomKeysetsValidationError(
                language,
                `extra component '${componentName}' keys for found ${JSON.stringify(keyDifference)}`,
            );
        }
    });

    // Check for extra components
    if (trustedComponents.length !== customComponents.length) {
        const componentDifference = getArrayDifference(trustedComponents, customComponents);
        throw createCustomKeysetsValidationError(
            language,
            `extra components found ${JSON.stringify(componentDifference)}`,
        );
    }
}

function createCustomKeysetsValidationError(language: string, text: string): Error {
    return new Error(`Custom keysets '${language}' validation error: ${text}`);
}

function getArrayDifference(arr1: string[], arr2: string[]) {
    const arr1Extra = arr1.filter((x) => !arr2.includes(x));
    const arr2Extra = arr2.filter((x) => !arr1.includes(x));

    return arr1Extra.concat(arr2Extra);
}
