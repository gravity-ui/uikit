import React from 'react';

import {Check, ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {Text, colorText} from '../../../Text';
import {borderRadius} from '../../../borderRadius';
import {Flex, FlexProps, spacing} from '../../../layout';
import type {QAProps} from '../../../types';
import {block} from '../../../utils/cn';
import {LIST_ITEM_DATA_ATR, modToHeight} from '../../constants';
import type {ListItemId, ListSizeTypes} from '../../types';

import './ListItemView.scss';

const b = block('list-item-view');

export interface ListItemViewProps extends QAProps, Omit<React.HTMLAttributes<'li'>, 'title'> {
    /**
     * Ability to override default html tag
     */
    as?: keyof JSX.IntrinsicElements;
    /**
     * @default `m`
     */
    size?: ListSizeTypes;
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
    selectable?: boolean;
    /**
     * Note: if passed and `disabled` option is `true` click will not be appear
     */
    onClick?(): void;
    style?: React.CSSProperties;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
    corners?: boolean;
    className?: string;
    expanded?: boolean;
    /**
     * `[${LIST_ITEM_DATA_ATR}="${id}"]` data attribute to find element.
     * For example for scroll to
     */
    id: ListItemId;
}

interface SlotProps extends FlexProps {
    indentation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const Slot = ({children, indentation: indent = 1, className, ...props}: SlotProps) => {
    return (
        <Flex className={b('slot', {indent}, className)} {...props}>
            {children}
        </Flex>
    );
};

const renderSafeIndentation = (indentation?: number) => {
    if (indentation && indentation >= 1 && indentation < 11) {
        return <Slot indentation={Math.floor(indentation) as SlotProps['indentation']} />;
    }
    return null;
};

export const ListItemView = React.forwardRef(
    (
        {
            id,
            as = 'li',
            size = 'm',
            active,
            selected,
            disabled,
            corners = true,
            activeOnHover = true,
            className,
            selectable = true,
            indentation,
            startSlot,
            subtitle,
            endSlot,
            title,
            height,
            expanded,
            style,
            onClick: _onClick,
            ...rest
        }: ListItemViewProps,
        ref?: any,
    ) => {
        const isGroup = typeof expanded === 'boolean';
        const onClick = disabled ? undefined : _onClick;

        return (
            <Flex
                aria-selected={selected}
                onClick={onClick}
                className={b(
                    {
                        active,
                        selected,
                        activeOnHover,
                        clickable: Boolean(onClick),
                    },
                    spacing({px: 2}, corners ? borderRadius({size}, className) : className),
                )}
                style={{
                    height: height ?? modToHeight[size][Number(Boolean(subtitle))],
                    ...style,
                }}
                as={as}
                ref={ref}
                {...{[LIST_ITEM_DATA_ATR]: id ? id : undefined}}
                alignItems="center"
                gap="4"
                justifyContent="space-between"
                {...rest}
            >
                <Flex gap="2" alignItems="center">
                    {selectable && (
                        <Slot>
                            {selected ? (
                                <Icon
                                    data={Check}
                                    size={16}
                                    className={colorText({color: 'info'})}
                                />
                            ) : null}
                        </Slot>
                    )}

                    {renderSafeIndentation(indentation)}

                    {startSlot ??
                        (isGroup ? (
                            <Icon data={expanded ? ChevronDown : ChevronUp} size={16} />
                        ) : null)}

                    <Flex direction="column" gap="0.5">
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
                    </Flex>
                </Flex>

                {endSlot}
            </Flex>
        );
    },
);

ListItemView.displayName = 'ListItemView';