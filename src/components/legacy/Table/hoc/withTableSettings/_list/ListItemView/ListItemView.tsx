import * as React from 'react';

import {spacing} from '../../../layout';
import type {QAProps} from '../../../types';
import {LIST_ITEM_DATA_ATR, modToHeight} from '../../constants';
import type {ListItemId, ListItemSize, ListItemViewContentType} from '../../types';

import {ListItemViewContent, isListItemContentPropsGuard} from './ListItemViewContent';
import {b} from './styles';

export interface ListItemViewCommonProps<T extends React.ElementType = 'li'> extends QAProps {
    /**
     * @default `m`
     */
    size?: ListItemSize;
    /**
     * `[${LIST_ITEM_DATA_ATR}="${id}"]` data attribute to find element.
     * For example for scroll to
     */
    id: ListItemId;
    /**
     * Note: if passed and `disabled` option is `true` click will not be appear
     */
    onClick?: React.ComponentPropsWithoutRef<T>['onClick'];
    selected?: boolean;
    disabled?: boolean;
    active?: boolean;
    selectionViewType?: 'single' | 'multiple';
    content: ListItemViewContentType;
}

export interface ListItemViewProps<T extends React.ElementType = 'li'>
    extends Omit<ListItemViewCommonProps<T>, 'content'> {
    /**
     * Ability to override default html tag
     */
    as?: T;
    height?: number;
    /**
     * By default hovered elements has active styles. You can disable this behavior
     */
    activeOnHover?: boolean;
    style?: React.CSSProperties;
    className?: string;
    role?: React.AriaRole;
    /**
     * Add active styles and change selection behavior during dnd is performing
     */
    dragging?: boolean;
    content: ListItemViewContentType | React.ReactNode;
}

type ListItemViewRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type ListItemViewPropsWithTypedAttrs<T extends React.ElementType> = ListItemViewProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof ListItemViewProps<T>>;

export const ListItemView = React.forwardRef(function ListItemView<
    T extends React.ElementType = 'li',
>(
    {
        id,
        as: asProps,
        size = 'm',
        active,
        selected,
        disabled,
        selectionViewType = 'multiple',
        activeOnHover: propsActiveOnHover,
        className,
        height,
        dragging,
        style: propsStyle,
        content,
        role = 'option',
        onClick: _onClick,
        ...rest
    }: ListItemViewProps<T>,
    ref?: ListItemViewRef<T>,
) {
    const Tag: React.ElementType = asProps || 'li';
    const onClick = disabled ? undefined : _onClick;
    const activeOnHover =
        typeof propsActiveOnHover === 'boolean' ? propsActiveOnHover : Boolean(onClick);
    const style = {
        minHeight: `var(--g-list-item-height, ${
            height ??
            modToHeight[size][
                Number(Boolean(isListItemContentPropsGuard(content) ? content?.subtitle : false))
            ]
        }px)`,
        ...propsStyle,
    };

    return (
        <Tag
            {...{[LIST_ITEM_DATA_ATR]: id}}
            role={role}
            aria-selected={selected}
            onClick={onClick}
            className={b(
                {
                    active: dragging || active,
                    selected: selected && selectionViewType === 'single',
                    activeOnHover,
                    radius: size,
                    size,
                    dragging,
                    clickable: Boolean(onClick),
                },
                spacing({px: 2}, className),
            )}
            style={style}
            ref={ref}
            {...rest}
        >
            {isListItemContentPropsGuard(content) ? (
                <ListItemViewContent
                    {...content}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                />
            ) : (
                content
            )}
        </Tag>
    );
}) as <C extends React.ElementType = 'li'>({
    ref,
    ...props
}: ListItemViewPropsWithTypedAttrs<C> & {ref?: ListItemViewRef<C>}) => React.ReactElement;
