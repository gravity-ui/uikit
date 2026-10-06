import {Label} from '../../Label';
import {Select} from '../Select';
import type {SelectSize} from '../types';

const OPTIONS = [{value: 'tall', content: 'Tall option'}];

/** A label taller than the inner area of the control: as tall as the control in s and m */
const LABEL_SIZE: Record<SelectSize, 's' | 'm'> = {s: 's', m: 'm', l: 'm', xl: 'm'};

export interface ControlStandProps {
    size: SelectSize;
}

/** No value, placeholder or label: the button of the control has no content */
export function EmptySelect({size}: ControlStandProps) {
    return (
        <div style={{padding: 20}}>
            <Select size={size} options={OPTIONS} />
        </div>
    );
}

export function TallSelectedOption({size}: ControlStandProps) {
    return (
        <div style={{padding: 20}}>
            <Select
                size={size}
                value={['tall']}
                options={OPTIONS}
                renderSelectedOptions={() => (
                    <Label size={LABEL_SIZE[size]} qa="tall-selected-option">
                        Tall
                    </Label>
                )}
            />
        </div>
    );
}
