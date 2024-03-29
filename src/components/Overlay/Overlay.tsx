import React from 'react';

import {block} from '../utils/cn';

import './Overlay.scss';

const b = block('overlay');

export type OverlayBackground = 'base' | 'float';

export interface OverlayProps {
    className?: string;
    view?: OverlayBackground;
    visible?: boolean;
    children?: React.ReactNode;
}

export function Overlay({
    className,
    view = 'base',
    visible: loading = false,
    children,
}: OverlayProps) {
    return (
        <div className={b({visible: loading}, className)}>
            <div className={b('background', {view})} />
            {children && <div className={b('children')}>{children}</div>}
        </div>
    );
}
