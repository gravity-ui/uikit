import type * as React from 'react';

import {cn} from '../../components/utils/cn';

import './ShowcaseItem.scss';

interface ShowcaseItemProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const b = cn('showcase-item');

export function ShowcaseItem({title, children, className}: ShowcaseItemProps) {
    return (
        <div className={b(null, className)}>
            <div className={b('title')}>{title}</div>
            <div className={b('content')}>{children}</div>
        </div>
    );
}
