import React from 'react';

import {block} from '../utils/cn';
import type {PopperArrowRef} from '../utils/usePopper';

import './Popup.scss';

const b = block('popup');

interface PopupArrowProps {
    // styles: React.CSSProperties;
    // attributes?: Record<string, unknown>;
    setArrowRef: (arrowRef: PopperArrowRef) => void;
}

export function PopupArrow({
    // styles, attributes,
    setArrowRef,
}: PopupArrowProps) {
    return (
        <div
            data-popper-arrow
            ref={setArrowRef}
            className={b('arrow')}
            // style={styles}
            // {...attributes}
        >
            <div className={b('arrow-content')}>
                <div className={b('arrow-circle-wrapper')}>
                    <div className={b('arrow-circle', {left: true})}></div>
                </div>
                <div className={b('arrow-circle-wrapper')}>
                    <div className={b('arrow-circle', {right: true})}></div>
                </div>
            </div>
        </div>
    );
}
