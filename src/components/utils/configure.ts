export enum Lang {
    Ru = 'ru',
    En = 'en',
}

interface Config {
    lang?: Lang;
}

type Subscriber = (config: Config) => void;

let subs: Subscriber[] = [];

const config: Config = {};

export const configure = (newConfig: Config) => {
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
