/* eslint-disable react/display-name */
import React from 'react';

import {ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {Label} from '../../../Label';
import {Text} from '../../../Text';
import {ListItemView, ListItemViewProps} from '../ListItemView/ListItemView';

export const ExpandIcon = ({expanded, size}: {expanded: boolean; size?: number}) => {
    return <Icon data={expanded ? ChevronDown : ChevronUp} size={size} />;
};

export interface ListGroupItemViewProps extends ListItemViewProps {
    childrenCount?: number;
    expanded?: boolean;
    /**
     * Show default expand icon view.
     * You can override this behavior by passing custom icon in start or end  slot
     */
    defaultExpandIcon?: boolean;
}

export const ListGroupItemView = ({
    title,
    childrenCount,
    expanded = true,
    defaultExpandIcon = true,
    endSlot,
    disabled,
    startSlot,
    ...props
}: ListGroupItemViewProps) => {
    return (
        <ListItemView
            title={
                typeof title === 'string' ? (
                    <Text
                        as="div"
                        ellipsis
                        variant="subheader-1"
                        color={disabled ? 'secondary' : undefined}
                    >
                        {title}
                    </Text>
                ) : (
                    title
                )
            }
            endSlot={
                endSlot ??
                (typeof childrenCount === 'number' ? <Label>{childrenCount}</Label> : null)
            }
            startSlot={startSlot ?? (defaultExpandIcon ? <ExpandIcon expanded={expanded} /> : null)}
            selectable={false}
            activeOnHover={false}
            {...props}
        />
    );
};
