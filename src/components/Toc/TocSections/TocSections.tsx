import React from 'react';

import {block} from '../../utils/cn';
import {TocItem} from '../TocItem';
import type {TocItem as TocItemType} from '../types';

import './TocSections.scss';

const b = block('toc-sections');

export interface TocSectionsProps {
    items: TocItemType[];
    value?: string;
    onUpdate?: (value: string) => void;
    depth?: number;
    childItem?: boolean;
    onItemClick?: (event: React.MouseEvent) => void;
}

export const TocSections = React.forwardRef<HTMLElement, TocSectionsProps>(function Toc(props) {
    const {value: activeValue, items, onUpdate, childItem, depth = 1, onItemClick} = props;

    if (depth > 6) {
        return null;
    }

    return (
        <ul className={b(null)}>
            {items.map(({value, content, href, items: childrenItems}) => (
                <li key={value ?? href} aria-current={activeValue === value}>
                    <TocItem
                        content={content}
                        value={value}
                        href={href}
                        active={activeValue === value}
                        onClick={onUpdate}
                        childItem={childItem}
                        depth={depth}
                        onItemClick={onItemClick}
                    />
                    {childrenItems && childrenItems.length > 0 && (
                        <TocSections
                            items={childrenItems}
                            onUpdate={onUpdate}
                            childItem
                            depth={depth + 1}
                            value={activeValue}
                            onItemClick={onItemClick}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
});
