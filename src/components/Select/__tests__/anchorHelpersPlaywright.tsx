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
    position?: 'top' | 'bottom' | 'center';
    width?: SelectProps['width'];
    customControl?: boolean;
    popupPlacement?: SelectProps['popupPlacement'];
}

/** A Select with the error message under the control and a stand for its trigger */
export function AnchorStand({
    position = 'top',
    width,
    customControl,
    popupPlacement,
}: AnchorStandProps) {
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
                alignItems: ({top: 'flex-start', bottom: 'flex-end', center: 'center'} as const)[
                    position
                ],
                width: 400,
                height: '100vh',
                padding: 20,
            }}
        >
            <div style={{flexGrow: 1}}>
                <Select
                    options={OPTIONS}
                    popupPlacement={popupPlacement}
                    width={width}
                    validationState="invalid"
                    errorMessage="The error message under the control"
                    renderControl={customControl ? renderControl : undefined}
                />
            </div>
        </div>
    );
}
