import type {StringWithSuggest} from '../utils/types';

export enum Lang {
    Ru = 'ru',
    En = 'en',
}

interface Config {
    lang: StringWithSuggest<Lang>;
    fallbackLang: StringWithSuggest<Lang>;
}

type Subscriber = (config: Config) => void;

let subs: Subscriber[] = [];

const config: Config = {
    lang: Lang.En,
    fallbackLang: Lang.En,
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
