import {block} from '../../utils/cn';
import {TocItem} from '../TocItem';
import type {TocItem as TocItemType} from '../types';

import './TocSections.scss';

const b = block('toc');

export interface TocSectionsProps {
    items: TocItemType[];
    value?: string;
    onUpdate?: (value: string) => void;
    depth?: number;
    childItem?: boolean;
    onItemClick?: (event: React.MouseEvent) => void;
}

export function TocSections(props: TocSectionsProps) {
    const {value: activeValue, items, onUpdate, childItem, depth = 1, onItemClick} = props;

    if (depth > 6) {
        return null;
    }

    return (
        <ul className={b('sections')}>
            {items.map(({value, content, href, items: childrenItems}) => (
                <li key={value ?? href} aria-current={activeValue === value}>
                    <TocItem
                        content={content}
                        href={href}
                        active={activeValue === value}
                        onClick={(event: React.MouseEvent) => {
                            onItemClick?.(event);

                            if (value === undefined || !onUpdate) {
                                return;
                            }

                            onUpdate?.(value);
                        }}
                        childItem={childItem}
                        depth={depth}
                    />
                    {childrenItems && childrenItems.length > 0 && (
                        <TocSections
                            items={childrenItems}
                            onUpdate={onUpdate}
                            childItem
                            depth={depth + 1}
                            value={activeValue}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}
