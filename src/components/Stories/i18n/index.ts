import en from './en.json';
import ru from './ru.json';

const REGEX_TOKEN = /{{(.+?)}}/gi;

export enum Lang {
    Ru = 'ru',
    En = 'en',
}

export default function i18n(lang: Lang, key: string, obj?: Record<string, any>) {
    const keyset = lang === Lang.Ru ? ru : en;
    const value = (keyset as any)[key] as string;

    if (obj) {
        return value.replace(REGEX_TOKEN, (m, token) => {
            const replaceValue = obj[token];

            return replaceValue || m;
        });
    }

    return value;
}
