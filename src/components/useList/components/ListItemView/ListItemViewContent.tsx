import React from 'react';

import {Check, ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {Text, colorText} from '../../../Text';
import {Flex} from '../../../layout';
import type {FlexProps} from '../../../layout';
import type {ListItemViewContentType} from '../../types';

import {b} from './styles';

export const isListItemContentPropsGuard = (
    props: ListItemViewContentType | React.ReactNode,
): props is ListItemViewContentType => {
    return typeof props === 'object' && props !== null && 'title' in props;
};

interface SlotProps extends FlexProps {
    indentation?: number;
}

const ListItemViewSlot = ({children, indentation = 1, className, ...props}: SlotProps) => {
    return (
        <Flex width={indentation * 16} className={b('slot', className)} {...props}>
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

interface ListItemViewContentProps extends ListItemViewContentType {
    selected?: boolean;
    disabled?: boolean;
    /**
     * Show selected icon if selected and reserve space for this icon
     */
    hasSelectionIcon: boolean;
}

export const ListItemViewContent = ({
    startSlot,
    subtitle,
    endSlot,
    disabled,
    hasSelectionIcon,
    isGroup,
    indentation,
    expanded,
    selected,
    title,
}: ListItemViewContentProps) => {
    return (
        <Flex alignItems="center" justifyContent="space-between" gap="4" className={b('content')}>
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
};
