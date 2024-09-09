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

export const registerCustomKeysets = (language: string, data: KeysetData) => {
    i18n.registerKeysets(language, data);
};
