import type {PersonaText} from './types';

export const extractTextValue = (text: PersonaText = '') => {
    if (text && typeof text === 'object') {
        return text.value;
    }

    return text;
};

export const extractTextView = (text: PersonaText = '') => {
    if (text && typeof text === 'object') {
        return text.content;
    }

    return text;
};
