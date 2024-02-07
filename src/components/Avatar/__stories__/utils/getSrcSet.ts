import type {SrcSetType} from './types';

export const getSrcSet = <T>(srcSet: SrcSetType<T>) => {
    let srcSetString = '';

    for (const item of srcSet) {
        let part = '';

        if (typeof item === 'string') {
            part = item;
        } else {
            part = item.join(' ');
        }

        srcSetString = `${srcSetString}${srcSetString === '' ? '' : ', '}${part}`;
    }

    return srcSetString;
};
