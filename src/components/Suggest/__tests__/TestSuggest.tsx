import * as React from 'react';

import type {SuggestProps} from '../Suggest';
import {Suggest} from '../Suggest';

type Item = {value: string; content: string; disabled?: boolean};

export const ITEMS: Item[] = [
    {value: 'earth', content: 'Earth'},
    {value: 'europa', content: 'Europa'},
    {value: 'jupiter', content: 'Jupiter'},
];

export type TestSuggestProps = SuggestProps<Item> & {
    customPopup?: boolean;
};

export function TestSuggest(props: TestSuggestProps) {
    const {customPopup, ...suggestProps} = props;
    const [value, setValue] = React.useState('');

    return (
        <div style={{width: 512, padding: 16}}>
            <Suggest<Item>
                items={ITEMS}
                renderItem={(item) => <div>{item.content}</div>}
                renderPopup={
                    customPopup
                        ? ({list}) => (
                              <div style={{padding: 8}}>
                                  <div style={{marginBottom: 8}}>Before list</div>
                                  {list}
                                  <div style={{marginTop: 8}}>After list</div>
                              </div>
                          )
                        : undefined
                }
                onUpdate={setValue}
                value={value}
                {...suggestProps}
            />
        </div>
    );
}
