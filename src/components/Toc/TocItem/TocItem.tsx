'use client';

import * as React from 'react';

import {useActionHandlers} from '../../../hooks';
import {block} from '../../utils/cn';
import type {TocItem as TocItemType} from '../types';

import './TocItem.scss';

const b = block('toc-item');

export interface TocItemProps extends TocItemType {
    childItem?: boolean;
    active?: boolean;
    onClick?: (value: string) => void;
    onItemClick?: (event: React.MouseEvent) => void;
}

export const TocItem = (props: TocItemProps) => {
    const {active = false, childItem = false, content, href, value, onClick, onItemClick} = props;

    const handleClick = React.useCallback(
        (event: React.MouseEvent) => {
            onItemClick?.(event);
            if (value === undefined || !onClick) {
                return;
            }

            onClick(value);
        },
        [onClick, onItemClick, value],
    );

    const {onKeyDown} = useActionHandlers(handleClick);

    const item =
        href === undefined ? (
            <div
                role="button"
                tabIndex={0}
                className={b('section-link')}
                onClick={handleClick}
                onKeyDown={onKeyDown}
            >
                {content}
            </div>
        ) : (
            <a href={href} onClick={handleClick} className={b('section-link')}>
                {content}
            </a>
        );

    return <div className={b('section', {child: childItem, active})}>{item}</div>;
};
