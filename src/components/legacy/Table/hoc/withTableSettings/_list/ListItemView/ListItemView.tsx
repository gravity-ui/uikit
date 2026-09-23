import * as React from 'react';

import {spacing} from '../../../../../../layout';
import {LIST_ITEM_DATA_ATR} from '../constants';
import type {ListItemId, ListItemViewContentType} from '../types';

import {ListItemViewContent} from './ListItemViewContent';
import {b} from './styles';

export interface ListItemViewCommonProps {
    /**
     * `[${LIST_ITEM_DATA_ATR}="${id}"]` data attribute to find element.
     * For example for scroll to
     */
    id: ListItemId;
    onClick?: React.MouseEventHandler;
    selected?: boolean;
    active?: boolean;
    selectionViewType?: 'single' | 'multiple';
    content: ListItemViewContentType;
}

export interface ListItemViewProps
    extends ListItemViewCommonProps,
        Omit<React.HTMLAttributes<HTMLLIElement>, keyof ListItemViewCommonProps> {
    /**
     * Add active styles and change selection behavior during dnd is performing
     */
    dragging?: boolean;
}

export const ListItemView = React.forwardRef<HTMLLIElement, ListItemViewProps>(
    function ListItemView(
        {
            id,
            active,
            selected,
            selectionViewType = 'multiple',
            dragging,
            className,
            style: propsStyle,
            content,
            onClick,
            ...rest
        },
        ref,
    ) {
        const style = {
            minHeight: 'var(--g-list-item-height, 34px)',
            ...propsStyle,
        };

        return (
            // The keyboard of the rows is handled by their list (useListKeydown)
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
                {...{[LIST_ITEM_DATA_ATR]: id}}
                role="option"
                aria-selected={selected}
                onClick={onClick}
                className={b(
                    {
                        active: dragging || active,
                        selected: selected && selectionViewType === 'single',
                        activeOnHover: Boolean(onClick),
                        dragging,
                        clickable: Boolean(onClick),
                    },
                    spacing({px: 2}, className),
                )}
                style={style}
                ref={ref}
                {...rest}
            >
                <ListItemViewContent
                    {...content}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                />
            </li>
        );
    },
);
