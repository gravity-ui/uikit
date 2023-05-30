import React from 'react';

import {block} from '../utils/cn';

import './Loader.scss';

const b = block('loader');

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
