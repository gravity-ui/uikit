import _ from 'lodash';

export function getTwoLetters(text: string) {
    const words = text.split(' ');
    return [_.get(words, '[0][0]'), _.get(words, '[1][0]')].filter(Boolean).join('');
}
