import React from 'react';

import type {QAProps} from '../types';
import {blockNew} from '../utils/cn';

import {TocItem} from './TocItem/TocItem';
import type {TocItems} from './types';

import './Toc.scss';

const b = blockNew('toc');

export interface TocProps extends QAProps {
    className?: string;
    value?: string;
    onUpdate?: (value: string) => void;
    items: TocItems;
}

export const Toc = React.forwardRef<HTMLElement, TocProps>(function Toc(props, ref) {
    const {value: activeValue, items, className, onUpdate, qa} = props;

    return (
        <nav className={b(null, className)} ref={ref} data-qa={qa}>
            <ul className={b('sections')}>
                {items.map(({value, content, href, items: childrenItems}) => (
                    <li key={value ?? href}>
                        <TocItem
                            content={content}
                            value={value}
                            href={href}
                            active={activeValue === value}
                            onClick={onUpdate}
                        />
                        {childrenItems?.length && (
                            <ul className={b('subsections')}>
                                {childrenItems?.map(
                                    ({
                                        value: childrenValue,
                                        content: childrenContent,
                                        href: childrenHref,
                                    }) => (
                                        <li key={childrenValue ?? childrenHref}>
                                            <TocItem
                                                content={childrenContent}
                                                value={childrenValue}
                                                href={childrenHref}
                                                childItem={true}
                                                active={activeValue === childrenValue}
                                                onClick={onUpdate}
                                            />
                                        </li>
                                    ),
                                )}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
});
