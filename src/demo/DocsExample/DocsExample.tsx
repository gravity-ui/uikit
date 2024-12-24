import * as React from 'react';

import {cn} from '../../components/utils/cn';

import './DocsExample.scss';

export interface DocsExampleProps {
    children: React.ReactNode;
    distribute?: 'start' | 'end' | 'center';
    gap?: 's' | 'm' | 'l';
    space?: 's' | 'm' | 'l';
    rounded?: boolean;
    background?: string;
}

const b = cn('docs-example');

export function DocsExample({
    children,
    distribute = 'start',
    gap = 'm',
    space = 'm',
    rounded = true,
    background = 'var(--g-color-base-background)',
}: DocsExampleProps) {
    return (
        <div style={{background}} className={b({distribute, gap, space, rounded})}>
            {React.Children.map(children, (elem, i) => (
                <div key={i} className={b('item')}>
                    {elem}
                </div>
            ))}
        </div>
    );
}
