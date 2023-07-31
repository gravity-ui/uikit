import React from 'react';

import {block} from '../../utils/cn';
import {useActionHandlers} from '../../utils/useActionHandlers';
import type {TocItem as TocItemType} from '../types';

import './TocItem.scss';

const b = block('toc-item');

export interface TocItemProps extends TocItemType {
    childItem?: boolean;
    active?: boolean;
    onClick: (value: string) => void;
}

export const TocItem = (props: TocItemProps) => {
    const {childItem = false, active = false, onClick, title, value} = props;

    const handleClick = () => onClick(value);

    const {onKeyDown} = useActionHandlers(handleClick);

    return (
        <div className={b('section', {child: childItem, active})}>
            <div
                role="radio"
                aria-checked={active}
                tabIndex={0}
                className={b('section-link')}
                onClick={handleClick}
                onKeyDown={onKeyDown}
            >
                {title}
            </div>
        </div>
    );
};
