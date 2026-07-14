import * as React from 'react';

import {Suggest} from '../Suggest';
import type {SuggestOption, SuggestProps} from '../types';

export const ITEMS: SuggestOption[] = [
    {value: 'earth', content: 'Earth'},
    {value: 'europa', content: 'Europa'},
    {value: 'jupiter', content: 'Jupiter'},
];

export type TestSuggestProps = Omit<SuggestProps, 'options'> & {
    options?: SuggestProps['options'];
};

export function TestSuggest({options = ITEMS, ...props}: TestSuggestProps) {
    const [value, setValue] = React.useState('');

    return (
        <div style={{width: 512, padding: 16}}>
            <Suggest value={value} onUpdate={setValue} options={options} {...props} />
        </div>
    );
}
