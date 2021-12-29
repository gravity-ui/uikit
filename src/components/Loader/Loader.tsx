import React from 'react';
import block from 'bem-cn-lite';

import './Loader.scss';

const b = block('yc-loader');

export type LoaderSize = 's' | 'm' | 'l';

export interface LoaderProps {
    className?: string;
    size?: LoaderSize;
}

export function Loader({size = 's', className}: LoaderProps) {
    return (
        <div className={b({size}, className)}>
            <div className={b('left')} />
            <div className={b('center')} />
            <div className={b('right')} />
        </div>
    );
}
