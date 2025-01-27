import * as React from 'react';

import {useUniqId} from '../../hooks';
import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

const b = block('menu');

export interface MenuGroupProps extends DOMProps, QAProps {
    label?: string;
    children?: React.ReactNode;
}

export const MenuGroup = React.forwardRef<HTMLLIElement, MenuGroupProps>(function MenuGroup(
    {label, children, style, className, qa},
    ref,
) {
    const labelId = useUniqId();

    return (
        <li ref={ref} className={b('list-group-item')}>
            <div style={style} className={b('group', className)} data-qa={qa}>
                {label && (
                    <div id={labelId} className={b('group-label')}>
                        {label}
                    </div>
                )}
                <ul role="group" aria-labelledby={labelId} className={b('group-list')}>
                    {children}
                </ul>
            </div>
        </li>
    );
});
