import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Loader.scss';

const b = block('loader');

export type LoaderSize = 's' | 'm' | 'l';

export interface LoaderProps extends QAProps {
    className?: string;
    size?: LoaderSize;
}

export function Loader({size = 's', className, qa}: LoaderProps) {
    return (
        <div className={b({size}, className)} data-qa={qa}>
            <div className={b('left')} />
            <div className={b('center')} />
            <div className={b('right')} />
        </div>
    );
}
