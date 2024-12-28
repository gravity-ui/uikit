import * as React from 'react';

import type {AriaLabelingProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {TocItem} from './TocItem/TocItem';
import type {TocItem as TocItemType} from './types';

import './Toc.scss';

const b = block('toc');

export interface TocProps extends AriaLabelingProps, QAProps {
    className?: string;
    items: TocItemType[];
    value?: string;
    onUpdate?: (value: string) => void;
    onItemClick?: (event: React.MouseEvent) => void;
}

export const Toc = React.forwardRef<HTMLElement, TocProps>(function Toc(props, ref) {
    const {value: activeValue, items, className, onUpdate, onItemClick, qa, ...otherProps} = props;

    return (
        <nav
            {...filterDOMProps(otherProps, {labelable: true})}
            className={b(null, className)}
            ref={ref}
            data-qa={qa}
        >
            <ul className={b('sections')}>
                {items.map(({value, content, href, items: childrenItems}) => (
                    <li key={value ?? href} aria-current={activeValue === value}>
                        <TocItem
                            content={content}
                            value={value}
                            href={href}
                            active={activeValue === value}
                            onClick={onUpdate}
                            onItemClick={onItemClick}
                        />
                        {childrenItems && childrenItems.length > 0 && (
                            <ul className={b('subsections')}>
                                {childrenItems?.map(
                                    ({
                                        value: childrenValue,
                                        content: childrenContent,
                                        href: childrenHref,
                                    }) => (
                                        <li
                                            key={childrenValue ?? childrenHref}
                                            aria-current={activeValue === childrenValue}
                                        >
                                            <TocItem
                                                content={childrenContent}
                                                value={childrenValue}
                                                href={childrenHref}
                                                childItem={true}
                                                active={activeValue === childrenValue}
                                                onClick={onUpdate}
                                                onItemClick={onItemClick}
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
