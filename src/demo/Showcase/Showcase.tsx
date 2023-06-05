import React from 'react';

import block from 'bem-cn-lite';

import './Showcase.scss';

type Props = React.PropsWithChildren<{
    title: string;
    description?: React.ReactNode;
    className?: string;
}>;

const b = block('showcase');

export function Showcase({title, description, className, children}: Props) {
    return (
        <div className={b(null, className)}>
            <div className={b('title')}>{title}</div>
            <div className={b('description')}>{description}</div>
            <div className={b('content')}>{children}</div>
        </div>
    );
}
