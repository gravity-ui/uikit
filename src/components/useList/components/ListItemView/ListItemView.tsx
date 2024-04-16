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

export interface ListItemViewProps extends QAProps, ListItemCommonProps {
    /**
     * Ability to override default html tag
     */
    as?: keyof JSX.IntrinsicElements;
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
    onClick?(): void;
    onMouseEnter?(): void;
    onMouseLeave?(): void;
    onClickCapture?(e: unknown): void;
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

interface SlotProps extends FlexProps {
    indentation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const ListItemViewSlot = ({
    children,
    indentation: indent = 1,
    className,
    ...props
}: SlotProps) => {
    return (
        <Flex className={b('slot', {indent}, className)} {...props}>
            {children}
        </Flex>
    );
};

const renderSafeIndentation = (indentation?: number) => {
    if (indentation && indentation >= 1 && indentation < 11) {
        return (
            <ListItemViewSlot indentation={Math.floor(indentation) as SlotProps['indentation']} />
        );
    }
    return null;
};

export const ListItemView = React.forwardRef(
    (
        {
            id,
            as = 'div',
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
            onClickCapture: _onClickCapture,
            ...rest
        }: ListItemViewProps,
        ref?: any,
    ) => {
        const isGroup = typeof expanded === 'boolean';
        const onClick = disabled ? undefined : _onClick;
        const onClickCapture = disabled ? undefined : _onClickCapture;
        const activeOnHover =
            typeof propsActiveOnHover === 'boolean' ? propsActiveOnHover : Boolean(onClick);

        return (
            <Flex
                {...{[LIST_ITEM_DATA_ATR]: id}}
                role={role}
                aria-selected={selected}
                onClick={onClick}
                onClickCapture={onClickCapture}
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
                                <Icon
                                    data={Check}
                                    size={16}
                                    className={colorText({color: 'info'})}
                                />
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
    },
);

ListItemView.displayName = 'ListItemView';
