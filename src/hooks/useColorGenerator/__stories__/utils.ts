import {randomString} from '../../../components/utils/common';

import {USERNAME_PREFIXES, USERNAME_SUFFIXES} from './constants';

export type StringType = 'random' | 'username' | 'id';
export type TokenSource = 'random' | 'usernames' | 'ids' | 'mixed' | 'custom';

export const generateUsername = (): string => {
    const prefix = USERNAME_PREFIXES[Math.floor(Math.random() * USERNAME_PREFIXES.length)];
    const suffix = USERNAME_SUFFIXES[Math.floor(Math.random() * USERNAME_SUFFIXES.length)];
    const separator = Math.random() > 0.5 ? '_' : '';
    return `${prefix}${separator}${suffix}`;
};

export const generateId = (): string => {
    const timestamp = Date.now().toString(36);
    const randomPart = randomString(6).toLowerCase();
    return `${timestamp}_${randomPart}`;
};

export const generateByType = (type: StringType, length = 16): string => {
    switch (type) {
        case 'username':
            return generateUsername();
        case 'id':
            return generateId();
        case 'random':
            return randomString(length);
        default:
            return randomString(16);
    }
};

export const generateTokens = (
    source: TokenSource,
    count: number,
    customTokens?: string,
): string[] => {
    if (source === 'custom' && customTokens) {
        return customTokens
            .split('\n')
            .map((token) => token.trim())
            .filter((token) => token.length > 0)
            .slice(0, count);
    }

    const tokens: string[] = [];

    for (let i = 0; i < count; i++) {
        switch (source) {
            case 'usernames':
                tokens.push(generateUsername());
                break;
            case 'ids':
                tokens.push(generateId());
                break;
            case 'mixed': {
                const types: StringType[] = ['random', 'username', 'id'];
                const randomType = types[Math.floor(Math.random() * types.length)];
                tokens.push(generateByType(randomType));
                break;
            }
            case 'random':
            default:
                tokens.push(randomString(32));
                break;
        }
    }

    return tokens;
};
