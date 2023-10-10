/* eslint-disable react/display-name */
import React from 'react';

import {ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {Label} from '../../../Label';
import {Text} from '../../../Text';
import type {
    ListItemBaseData,
    ListItemRendererProps as ListItemRendererPropsBase,
} from '../../types';
import {createListItemQa} from '../../utils/createListItemQa';
import {useListContext} from '../ListContext/ListContext';
import {ListItemView} from '../ListItemView/ListItemView';

interface ListItemRendererProps extends ListItemRendererPropsBase<ListItemBaseData> {}

export const ListItemRenderer = React.memo(({item, index}: ListItemRendererProps) => {
    const {
        activeItem,
        order,
        groupsState,
        size,
        expandedState,
        onItemClick,
        onGroupItemClick,
        itemHandlers,
        selected,
        itemsState,
        disabled,
    } = useListContext();
    const id = order[index];
    const indentation = itemsState[id]?.indentation || 0;
    const expanded = id in expandedState ? expandedState[id] : true;
    const isGroup = id in groupsState;

    const {handlers, onClick, qa} = React.useMemo(() => {
        let onClick;

        if (isGroup) {
            onClick = () => onGroupItemClick(id);
        } else if (onItemClick) {
            onClick = () => onItemClick(id);
        }

        return {
            handlers: itemHandlers(id),
            onClick,
            qa: createListItemQa(id),
        };
    }, [itemHandlers, id, isGroup, onItemClick, onGroupItemClick]);

    return (
        <ListItemView
            {...handlers}
            {...item}
            title={
                isGroup ? (
                    <Text
                        as="div"
                        ellipsis
                        variant="subheader-1"
                        color={disabled[id] ? 'secondary' : undefined}
                    >
                        {item.title}
                    </Text>
                ) : (
                    item.title
                )
            }
            active={id === activeItem}
            selected={Boolean(selected[id])}
            onClick={onClick}
            key={index}
            endSlot={isGroup ? <Label>{groupsState[id].childrenCount}</Label> : null}
            qa={qa}
            startSlot={
                isGroup && groupsState[id].childrenCount > 0 ? (
                    <Icon data={expanded ? ChevronDown : ChevronUp} size={16} />
                ) : null
            }
            indentation={indentation}
            size={size}
            selectable={!isGroup}
            activeOnHover={!isGroup}
            disabled={disabled[id]}
        />
    );
});
