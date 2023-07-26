import React from 'react';

import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './Spin.scss';

const b = block('spin');

export type SpinSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface SpinProps extends DOMProps, QAProps {
    size?: SpinSize;
}

export const Spin = React.forwardRef<HTMLDivElement, SpinProps>(function Spin(props, ref) {
    const {size = 'm', style, className, 'data-qa': dataQa} = props;

    return (
        <div ref={ref} style={style} className={b({size}, className)} data-qa={dataQa}>
            <div className={b('inner')} />
        </div>
    );
});
