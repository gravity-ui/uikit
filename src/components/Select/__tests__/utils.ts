import {act} from '@testing-library/react';
import range from 'lodash/range';
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
    // https://testing-library.com/docs/react-testing-library/api/#act
    // https://reactjs.org/docs/test-utils.html#act
    return act(async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
};
