import React from 'react';

import {Check, ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {Text, colorText} from '../../../Text';
import {Flex, spacing} from '../../../layout';
import type {FlexProps} from '../../../layout';
import type {QAProps} from '../../../types';
import {block} from '../../../utils/cn';
import {LIST_ITEM_DATA_ATR, modToHeight} from '../../constants';
import type {ListItemCommonProps, ListItemId, ListItemSize} from '../../types';

import './ListItemView.scss';

const b = block('list-item-view');

export interface ListItemViewProps<T extends React.ElementType = 'div'>
    extends QAProps,
        ListItemCommonProps {
    /**
     * Ability to override default html tag
     */
    as?: T;
    /**
     * @default `m`
     */
    size?: ListItemSize;
    height?: number;
    selected?: boolean;
    active?: boolean;
    disabled?: boolean;
    /**
     * By default hovered elements has active styles. You can disable this behavior
     */
    activeOnHover?: boolean;
    /**
     * Build in indentation component to render nested views structure
     */
    indentation?: number;
    /**
     * Show selected icon if selected and reserve space for this icon
     */
    hasSelectionIcon?: boolean;
    /**
     * Note: if passed and `disabled` option is `true` click will not be appear
     */
    onClick?: React.ComponentPropsWithoutRef<T>['onClick'];
    style?: React.CSSProperties;
    className?: string;
    role?: React.AriaRole;
    expanded?: boolean;
    /**
     * Add active styles and change selection behavior during dnd is performing
     */
    dragging?: boolean;
    /**
     * `[${LIST_ITEM_DATA_ATR}="${id}"]` data attribute to find element.
     * For example for scroll to
     */
    id: ListItemId;
}

type ListItemViewRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type ListItemViewPropsWithTypedAttrs<T extends React.ElementType> = ListItemViewProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof ListItemViewProps<T>>;

interface SlotProps extends FlexProps {
    indentation?: number;
}

export const ListItemViewSlot = ({
    children,
    indentation: indent = 1,
    className,
    ...props
}: SlotProps) => {
    return (
        <Flex width={indent * 16} className={b('slot', className)} {...props}>
            {children}
        </Flex>
    );
};

const renderSafeIndentation = (indentation?: number) => {
    if (indentation && indentation >= 1) {
        return (
            <ListItemViewSlot indentation={Math.floor(indentation) as SlotProps['indentation']} />
        );
    }
    return null;
};

export const ListItemView = React.forwardRef(function ListItemView<
    T extends React.ElementType = 'div',
>(
    {
        id,
        as: asProps,
        size = 'm',
        active,
        selected,
        disabled,
        activeOnHover: propsActiveOnHover,
        className,
        hasSelectionIcon = true,
        indentation,
        startSlot,
        subtitle,
        endSlot,
        title,
        height,
        expanded,
        dragging,
        style,
        role = 'option',
        onClick: _onClick,
        ...rest
    }: ListItemViewPropsWithTypedAttrs<T>,
    ref?: ListItemViewRef<T>,
) {
    const as: React.ElementType = asProps || 'div';
    const isGroup = typeof expanded === 'boolean';
    const onClick = disabled ? undefined : _onClick;
    const activeOnHover =
        typeof propsActiveOnHover === 'boolean' ? propsActiveOnHover : Boolean(onClick);

    return (
        <Flex
            {...{[LIST_ITEM_DATA_ATR]: id}}
            role={role}
            aria-selected={selected}
            onClick={onClick}
            className={b(
                {
                    active: dragging || active,
                    selected: selected && !hasSelectionIcon,
                    activeOnHover,
                    radius: size,
                    dragging,
                    clickable: Boolean(onClick),
                },
                spacing({px: 2}, className),
            )}
            style={{
                minHeight: height ?? modToHeight[size][Number(Boolean(subtitle))],
                ...style,
            }}
            as={as}
            ref={ref}
            alignItems="center"
            gap="4"
            justifyContent="space-between"
            {...rest}
        >
            <Flex gap="2" alignItems="center" grow>
                {hasSelectionIcon && (
                    <ListItemViewSlot // reserve space
                    >
                        {selected ? (
                            <Icon data={Check} size={16} className={colorText({color: 'info'})} />
                        ) : null}
                    </ListItemViewSlot>
                )}

                {renderSafeIndentation(indentation)}

                {isGroup ? (
                    <Icon
                        className={b('icon', colorText({color: disabled ? 'hint' : undefined}))}
                        data={expanded ? ChevronDown : ChevronUp}
                        size={16}
                    />
                ) : null}

                {startSlot}

                <div className={b('main-content')}>
                    {typeof title === 'string' ? (
                        <Text
                            ellipsis
                            color={disabled ? 'hint' : undefined}
                            variant={isGroup ? 'subheader-1' : undefined}
                        >
                            {title}
                        </Text>
                    ) : (
                        title
                    )}
                    {typeof subtitle === 'string' ? (
                        <Text ellipsis color={disabled ? 'hint' : 'secondary'}>
                            {subtitle}
                        </Text>
                    ) : (
                        subtitle
                    )}
                </div>
            </Flex>

            {endSlot}
        </Flex>
    );
}) as <C extends React.ElementType = 'span'>({
    ref,
    ...props
}: ListItemViewPropsWithTypedAttrs<C> & {ref?: ListItemViewRef<C>}) => React.ReactElement;
