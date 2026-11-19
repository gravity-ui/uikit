import {block} from '../utils/cn';

export const Platform = {
    IOS: 'ios',
    ANDROID: 'android',
    BROWSER: 'browser',
} as const;
export type Platform = (typeof Platform)[keyof typeof Platform];

const b = block('root');
export const rootMobileClassName = b({mobile: true}).split(/\s+/)[1];
