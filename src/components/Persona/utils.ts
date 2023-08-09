import _ from 'lodash';

import type {PersonaText} from './types';

export const extractTextValue = (text: PersonaText = '') => {
    if (text && typeof text === 'object') {
        return text.value;
    }

    return text;
};

export const extractTextView = (text: PersonaText = '') => {
    if (text && typeof text === 'object') {
        return text.view;
    }

    return text;
};

export function getTwoLetters(text: string) {
    const words = text.split(' ');
    return [_.get(words, '[0][0]'), _.get(words, '[1][0]')].filter(Boolean).join('');
}
