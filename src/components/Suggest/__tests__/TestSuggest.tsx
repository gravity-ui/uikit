import * as React from 'react';

import {Suggest} from '../Suggest';
import type {SuggestProps} from '../types';

type Planet = {value: string; content: string; disabled?: boolean};

export const ITEMS: Planet[] = [
    {value: 'earth', content: 'Earth'},
    {value: 'europa', content: 'Europa'},
    {value: 'jupiter', content: 'Jupiter'},
];

export type TestSuggestProps = Omit<SuggestProps<Planet>, 'items'> & {
    items?: SuggestProps<Planet>['items'];
};

export function TestSuggest({items = ITEMS, ...props}: TestSuggestProps) {
    const [value, setValue] = React.useState('');

    return (
        <div style={{width: 512, padding: 16}}>
            <Suggest<Planet>
                value={value}
                onUpdate={setValue}
                items={items}
                renderItem={(item) => <div>{item.content}</div>}
                {...props}
            />
        </div>
    );
}
