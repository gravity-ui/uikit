import React from 'react';

import {Check} from '@gravity-ui/icons';
import type {QAProps} from 'src/components/types';

import {Icon} from '../../../Icon';
import {Text, colorText} from '../../../Text';
import {Flex, spacing} from '../../../layout';
import {block} from '../../../utils/cn';
import {bListRadiuses, modToHeight} from '../../constants';
import type {ListSizeTypes} from '../../types';

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
    size?: ListSizeTypes;
    height?: number;
    selected?: boolean;
    active?: boolean;
    /**
     * display: hidden;
     */
    hidden?: boolean;
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
    title: string | React.ReactNode;
    subtitle?: string;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    corners?: boolean;
    className?: string;
}

export const Slot = ({children}: {children?: React.ReactNode}) => {
    return <div className={b('slot')}>{children}</div>;
};

export const computeIndentation = (payload = 0) => {
    return React.Children.toArray(Array(payload < 0 ? 0 : payload).fill(<Slot />));
};

export const ListItemView = ({
    as = 'li',
    leftSlot,
    rightSlot,
    title,
    subtitle,
    size = 'm',
    active,
    hidden,
    selected,
    disabled,
    corners = true,
    activeOnHover = true,
    indentation,
    className,
    height,
    selectable = true,
    onClick: _onClick,
    ...rest
}: ListItemViewProps) => {
    const onClick = disabled ? undefined : _onClick;

    return (
        <Flex
            onClick={onClick}
            alignItems="center"
            className={b(
                {
                    hidden,
                    active,
                    selected,
                    activeOnHover,
                    clickable: Boolean(onClick),
                },
                spacing({px: 2}, corners ? bListRadiuses({size}, className) : className),
            )}
            as={as}
            gap="4"
            justifyContent="space-between"
            style={{height: height ?? modToHeight[size][Number(Boolean(subtitle))]}}
            {...rest}
        >
            <Flex gap="2" alignItems="center">
                {selectable && (
                    <Slot>
                        {selected ? (
                            <Icon data={Check} size={16} className={colorText({color: 'info'})} />
                        ) : null}
                    </Slot>
                )}

                {computeIndentation(indentation)}

                {leftSlot}
                <Flex direction="column" gap="0.5">
                    {typeof title === 'string' ? (
                        <Text color={disabled ? 'hint' : undefined}>{title}</Text>
                    ) : (
                        title
                    )}
                    {subtitle && <Text color={disabled ? 'hint' : 'secondary'}>{subtitle}</Text>}
                </Flex>
            </Flex>
            <Flex gap="2">{rightSlot}</Flex>
        </Flex>
    );
};
