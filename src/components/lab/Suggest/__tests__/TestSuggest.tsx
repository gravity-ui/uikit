import * as React from 'react';

import {Suggest} from '../Suggest';
import type {SuggestProps} from '../types';

type Planet = {value: string; content: string; disabled?: boolean};

export const ITEMS: Planet[] = [
    {value: 'earth', content: 'Earth'},
    {value: 'europa', content: 'Europa'},
    {value: 'jupiter', content: 'Jupiter'},
];

export type TestSuggestProps = Omit<SuggestProps<Planet>, 'options'> & {
    options?: SuggestProps<Planet>['options'];
};

export function TestSuggest({options = ITEMS, ...props}: TestSuggestProps) {
    const [value, setValue] = React.useState('');

    return (
        <div style={{width: 512, padding: 16}}>
            <Suggest<Planet>
                value={value}
                onUpdate={setValue}
                options={options}
                renderOption={(item) => <div>{item.content}</div>}
                {...props}
            />
        </div>
    );
}
