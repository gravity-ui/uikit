import type * as React from 'react';

import {Button} from '../../Button';
import {Select} from '../Select';
import type {SelectProps} from '../types';

const OPTIONS = [
    {value: 'one', content: 'One'},
    {value: 'two', content: 'Two'},
    {value: 'three', content: 'Three'},
];

export interface AnchorStandProps {
    /** Where the Select stands: at the bottom of the viewport the popup flips up */
    position?: 'top' | 'bottom';
    width?: SelectProps['width'];
    customControl?: boolean;
}

/** A Select with the error message under the control and a stand for its trigger */
export function AnchorStand({position = 'top', width, customControl}: AnchorStandProps) {
    const renderControl: SelectProps['renderControl'] = ({ref, triggerProps}) => (
        <Button ref={ref as React.Ref<HTMLButtonElement>} {...triggerProps} qa="custom-control">
            Custom control
        </Button>
    );

    return (
        <div
            style={{
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: position === 'top' ? 'flex-start' : 'flex-end',
                width: 400,
                height: '100vh',
                padding: 20,
            }}
        >
            <div style={{flexGrow: 1}}>
                <Select
                    options={OPTIONS}
                    width={width}
                    validationState="invalid"
                    errorMessage="The error message under the control"
                    renderControl={customControl ? renderControl : undefined}
                />
            </div>
        </div>
    );
}
