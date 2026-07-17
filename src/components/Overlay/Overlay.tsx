import type * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';
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

export function Overlay(rawProps: OverlayProps) {
    const {
        className,
        background = 'base',
        visible = false,
        children,
    } = useDefaultProps('Overlay', rawProps);
    return (
        <div className={b({visible}, className)}>
            <div className={b('background', {style: background})} />
            {children && <div className={b('children')}>{children}</div>}
        </div>
    );
}
