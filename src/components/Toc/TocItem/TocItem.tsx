'use client';

import type * as React from 'react';

import {useActionHandlers} from '../../../hooks';
import {block} from '../../utils/cn';
import type {TocItem as TocItemType} from '../types';

import './TocItem.scss';

const b = block('toc-item');

export interface TocItemProps extends TocItemType {
    childItem?: boolean;
    active?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    depth: number;
}

export const TocItem = (props: TocItemProps) => {
    const {active = false, childItem = false, content, href, onClick, depth} = props;

    const {onKeyDown} = useActionHandlers(onClick);

    const item =
        href === undefined ? (
            <div
                role="button"
                tabIndex={0}
                className={b('section-link')}
                onClick={onClick}
                onKeyDown={onKeyDown}
            >
                {content}
            </div>
        ) : (
            <a href={href} onClick={onClick} className={b('section-link')}>
                {content}
            </a>
        );

    return <div className={b('section', {child: childItem, depth, active})}>{item}</div>;
};
