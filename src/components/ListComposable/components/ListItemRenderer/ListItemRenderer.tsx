/* eslint-disable react/display-name */
import React from 'react';

import {ChevronDown, ChevronUp} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {Label} from '../../../Label';
import {Text} from '../../../Text';
import type {
    ListItemBaseData,
    ListItemRendererProps as ListItemRendererPropsBase,
    RenderListItemViewProps,
} from '../../types';
import {createListItemQa} from '../../utils/createListItemQa';
import {useListContext} from '../ListContext/ListContext';

interface ListItemRendererProps extends ListItemRendererPropsBase<ListItemBaseData> {
    View: (props: RenderListItemViewProps) => React.JSX.Element;
}

export const ListItemRenderer = ({item, id: index, View}: ListItemRendererProps) => {
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
        <View
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
            isGroup={isGroup}
            active={id === activeItem}
            selected={Boolean(selected[id])}
            onClick={onClick}
            key={index}
            rightSlot={isGroup ? <Label>{groupsState[id].childrenCount}</Label> : null}
            qa={qa}
            leftSlot={
                isGroup && groupsState[id].childrenCount > 0 ? (
                    <Icon data={expanded ? ChevronDown : ChevronUp} size={16} />
                ) : null
            }
            indentation={indentation}
            size={size}
            activeOnHover={!isGroup}
            disabled={disabled[id]}
        />
    );
};
