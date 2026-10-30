'use client';

import {groupBy} from 'es-toolkit/compat';

import type {ActionsPanelItem} from '../../types';

import type {VisibilityMap} from './types';

type UseDropdownActionsArg = {
    buttonActions: ActionsPanelItem[];
    restActions: ActionsPanelItem[];
    visibilityMap: VisibilityMap;
};

type DropdownItem = ActionsPanelItem['menu']['item'];

export const useDropdownActions = ({
    buttonActions,
    restActions,
    visibilityMap,
}: UseDropdownActionsArg) => {
    const actions = [
        ...buttonActions.filter((action) => !visibilityMap[action.id]),
        ...restActions,
    ];
    const groups = groupBy(actions, (action) => action.menu.group);

    const usedGroups = new Set<string>();
    const dropdownItems: (DropdownItem | DropdownItem[])[] = [];

    for (const action of actions) {
        const group = action.menu.group;
        if (typeof group === 'undefined') {
            dropdownItems.push(action.menu.item);
            continue;
        }
        if (usedGroups.has(group)) {
            continue;
        }
        usedGroups.add(group);
        dropdownItems.push(groups[group].map((groupedAction) => groupedAction.menu.item));
    }

    return dropdownItems;
};
