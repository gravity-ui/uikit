import {range} from 'lodash';
import {SelectOption} from '..';

export const generateOptions = (args: number | [string, string][]): SelectOption[] => {
    if (typeof args === 'number') {
        return range(0, args).map((i) => ({
            value: `val${i + 1}`,
            content: `Value ${i + 1}`,
        }));
    }

    return args.map(([value, content]) => ({value, content}));
};

export const timeout = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
