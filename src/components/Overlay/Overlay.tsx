import type * as React from 'react';

import {block} from '../utils/cn';

import './Overlay.scss';

const b = block('overlay');

export type OverlayBackground = 'base' | 'float';

export interface OverlayProps {
    className?: string;
    background?: OverlayBackground;
    visible?: boolean;
    children?: React.ReactNode;
}

export function Overlay({className, background = 'base', visible = false, children}: OverlayProps) {
    return (
        <div className={b({visible}, className)}>
            <div className={b('background', {style: background})} />
            {children && <div className={b('children')}>{children}</div>}
        </div>
    );
}
