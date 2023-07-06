import React from 'react';

import {useDirection} from '@radix-ui/react-direction';

import {block} from '../utils/cn';

import './Popup.scss';

const b = block('popup');

interface PopupArrowProps {
    styles: React.CSSProperties;
    attributes?: Record<string, unknown>;
    setArrowRef: (value: HTMLDivElement) => void;
}

export function PopupArrow({styles, attributes, setArrowRef}: PopupArrowProps) {
    const dir = useDirection();

    const isRTL = dir === 'rtl';
    const right = {right: true};
    const left = {left: true};

    return (
        <div
            data-popper-arrow
            ref={setArrowRef}
            className={b('arrow')}
            style={styles}
            {...attributes}
        >
            <div className={b('arrow-content')}>
                <div className={b('arrow-circle-wrapper')}>
                    <div className={b('arrow-circle', isRTL ? right : left)}></div>
                </div>
                <div className={b('arrow-circle-wrapper')}>
                    <div className={b('arrow-circle', isRTL ? left : right)}></div>
                </div>
            </div>
        </div>
    );
}
