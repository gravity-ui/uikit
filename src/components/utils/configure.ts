import type {KeysetData} from '@gravity-ui/i18n';

import {i18n} from '../../i18n';
import type {AutocompleteSafeString} from '../../utils/autocomplete-safe-string';

export enum Lang {
    Ru = 'ru',
    En = 'en',
}

interface Config {
    lang: `${Lang}` | AutocompleteSafeString;
}

type Subscriber = (config: Config) => void;

let subs: Subscriber[] = [];

const config: Config = {
    lang: Lang.En,
};

export const configure = (newConfig: Partial<Config>) => {
    Object.assign(config, newConfig);
    subs.forEach((sub) => {
        sub(config);
    });
};

export const subscribeConfigure = (sub: Subscriber) => {
    subs.push(sub);

    return () => {
        subs = subs.filter((item) => item !== sub);
    };
};

export const getConfig = () => config;

const validateCustomKeysets = (language: string, data: KeysetData) => {
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
};

export const registerCustomKeysets = (language: string, data: KeysetData) => {
    validateCustomKeysets(language, data);
    i18n.registerKeysets(language, data);
};

function createCustomKeysetsValidationError(language: string, text: string): Error {
    return new Error(`Custom keysets '${language}' validation error: ${text}`);
}
