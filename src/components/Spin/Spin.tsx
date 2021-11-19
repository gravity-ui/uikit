import React from 'react';
import {block} from '../utils/cn';
import {DOMProps, QAProps} from '../types';

import './Spin.scss';

const b = block('spin');

export type SpinSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface SpinProps extends DOMProps, QAProps {
    size?: SpinSize;
}

export const Spin = React.forwardRef<HTMLDivElement, SpinProps>(function Spin(props, ref) {
    const {size = 'm', style, className, qa} = props;

    return (
        <div ref={ref} style={style} className={b({size}, className)} data-qa={qa}>
            <div className={b('inner')} />
        </div>
    );
});
