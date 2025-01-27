import type * as React from 'react';

import {cn} from '../../components/utils/cn';

import './Showcase.scss';

type Props = React.PropsWithChildren<{
    title?: string;
    description?: React.ReactNode;
    direction?: 'row' | 'column';
    className?: string;
}>;

const b = cn('showcase');

export function Showcase({title, description, direction = 'row', className, children}: Props) {
    return (
        <div className={b({direction}, className)}>
            {title && <div className={b('title')}>{title}</div>}
            {description && <div className={b('description')}>{description}</div>}
            <div className={b('content')}>{children}</div>
        </div>
    );
}
