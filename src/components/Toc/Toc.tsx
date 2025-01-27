import * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {TocSections} from './TocSections';
import type {TocItem as TocItemType} from './types';

const b = block('toc');

export interface TocProps extends QAProps {
    className?: string;
    items: TocItemType[];
    value?: string;
    onUpdate?: (value: string) => void;
    onItemClick?: (event: React.MouseEvent) => void;
}

export const Toc = React.forwardRef<HTMLElement, TocProps>(function Toc(props, ref) {
    const {value: activeValue, items, className, onUpdate, qa, onItemClick} = props;

    return (
        <nav className={b(null, className)} ref={ref} data-qa={qa}>
            <TocSections
                items={items}
                value={activeValue}
                onUpdate={onUpdate}
                depth={1}
                onItemClick={onItemClick}
            />
        </nav>
    );
});
