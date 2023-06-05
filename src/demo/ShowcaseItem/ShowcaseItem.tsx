import React from 'react';

import block from 'bem-cn-lite';

import './ShowcaseItem.scss';

interface ShowcaseItemProps {
    title: string;
    children: React.ReactNode;
}

const b = block('showcase-item');

export function ShowcaseItem({title, children}: ShowcaseItemProps) {
    return (
        <div className={b()}>
            <div className={b('title')}>{title}</div>
            <div className={b('content')}>{children}</div>
        </div>
    );
}
