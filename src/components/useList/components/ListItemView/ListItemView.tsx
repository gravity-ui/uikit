import React from 'react';

import {Check, ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {Text, colorText} from '../../../Text';
import {Flex, spacing} from '../../../layout';
import type {FlexProps} from '../../../layout';
import type {QAProps} from '../../../types';
import {block} from '../../../utils/cn';
import {LIST_ITEM_DATA_ATR, modToHeight} from '../../constants';
import type {ListItemId, ListItemSize} from '../../types';

import './ListItemView.scss';

const b = block('list-item-view');

export interface ListItemViewProps extends QAProps {
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
    style?: React.CSSProperties;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
    className?: string;
    role?: React.AriaRole;
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
            activeOnHover = true,
            className,
            hasSelectionIcon = true,
            indentation,
            startSlot,
            subtitle,
            endSlot,
            title,
            height,
            expanded,
            style,
            role = 'option',
            onClick: _onClick,
            ...rest
        }: ListItemViewProps,
        ref?: any,
    ) => {
        const isGroup = typeof expanded === 'boolean';
        const onClick = disabled ? undefined : _onClick;

        return (
            <Flex
                role={role}
                aria-selected={selected}
                onClick={onClick}
                className={b(
                    {
                        active,
                        selected: selected && !hasSelectionIcon,
                        activeOnHover,
                        radius: size,
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
                {...{[LIST_ITEM_DATA_ATR]: id ? id : undefined}}
                alignItems="center"
                gap="4"
                justifyContent="space-between"
                {...rest}
            >
                <Flex gap="2" alignItems="center">
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
