import React from 'react';

import {useActionHandlers} from '../../../hooks';
import {blockNew} from '../../utils/cn';
import type {TocItem as TocItemType} from '../types';

import './TocItem.scss';

const b = blockNew('toc-item');

export interface TocItemProps extends TocItemType {
    childItem?: boolean;
    active?: boolean;
    onClick?: (value: string) => void;
}

export const TocItem = (props: TocItemProps) => {
    const {active = false, childItem = false, content, href, value, onClick} = props;

    const handleClick = React.useCallback(() => {
        if (value === undefined || !onClick) {
            return;
        }

        onClick(value);
    }, [onClick, value]);

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
