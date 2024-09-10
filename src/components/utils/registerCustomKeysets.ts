import type {KeysetData} from '@gravity-ui/i18n';

import {i18n} from '../../i18n';

export const registerCustomKeysets = (language: string, data: KeysetData) => {
    validateCustomKeysets(language, data);
    i18n.registerKeysets(language, data);
};

function validateCustomKeysets(language: string, givenData: KeysetData): void {
    const trustedData = i18n.data.en;

    const trustedComponents = Object.keys(trustedData);
    const givenComponents = Object.keys(givenData);

    trustedComponents.forEach((componentName) => {
        const trustedKeys = Object.keys(trustedData[componentName]);
        const givenKeys = Object.keys(givenData[componentName]);

        // Check that all component keys in trusted data exist in given data
        trustedKeys.forEach((keyName) => {
            if (givenData[componentName] === undefined) {
                throw createValidationError(
                    language,
                    `keyset for component '${componentName}' is required`,
                );
            }
            if (givenData[componentName][keyName] === undefined) {
                throw createValidationError(
                    language,
                    `key '${keyName}' for component '${componentName}' is required`,
                );
            }
        });

        // Check for extra component keys
        if (trustedKeys.length !== givenKeys.length) {
            const keyDifference = getArrayDifference(trustedKeys, givenKeys);
            throw createValidationError(
                language,
                `excess component '${componentName}' keys for found ${JSON.stringify(keyDifference)}`,
            );
        }
    });

    // Check for extra components
    if (trustedComponents.length !== givenComponents.length) {
        const componentDifference = getArrayDifference(trustedComponents, givenComponents);
        throw createValidationError(
            language,
            `excess components found ${JSON.stringify(componentDifference)}`,
        );
    }
}

function createValidationError(language: string, text: string): Error {
    return new Error(`Custom keysets '${language}' validation error: ${text}`);
}

function getArrayDifference(arr1: string[], arr2: string[]): string[] {
    const arr1Extra = arr1.filter((x) => !arr2.includes(x));
    const arr2Extra = arr2.filter((x) => !arr1.includes(x));

    return arr1Extra.concat(arr2Extra);
}
