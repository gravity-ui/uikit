import React from 'react';

import {cn} from '../../components/utils/cn';

import './Showcase.scss';

type Props = React.PropsWithChildren<{
    title?: string;
    description?: React.ReactNode;
    className?: string;
    isVertical?: boolean;
}>;

const b = cn('showcase');

export function Showcase({title, description, className, children, isVertical}: Props) {
    return (
        <div className={b(null, className)}>
            {title && <div className={b('title')}>{title}</div>}
            {description && <div className={b('description')}>{description}</div>}
            <div className={b('content', {isVertical})}>{children}</div>
        </div>
    );
}
