import {block} from '../utils/cn';

export enum Platform {
    IOS = 'ios',
    ANDROID = 'android',
    BROWSER = 'browser',
}

const b = block('root');
export const rootMobileClassName = b({mobile: true}).split(/\s+/)[1];
