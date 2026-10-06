import {Select} from '../Select';
import type {SelectSize} from '../types';

const OPTIONS = [
    {label: 'Fruits', options: [{value: 'apple', content: 'Apple'}]},
    {label: 'Vegetables', options: [{value: 'carrot', content: 'Carrot'}]},
];

export function GroupedSelect({size}: {size: SelectSize}) {
    return (
        <div style={{padding: 20, width: 300}}>
            <Select size={size} options={OPTIONS} />
        </div>
    );
}
