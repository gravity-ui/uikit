'use client';

import groupBy from 'lodash/groupBy';

import type {DropdownMenuItem} from '../../../DropdownMenu';
import type {ActionsPanelItem} from '../../types';

import type {VisibilityMap} from './types';

type UseDropdownActionsArg = {
    buttonActions: ActionsPanelItem[];
    restActions: ActionsPanelItem[];
    visibilityMap: VisibilityMap;
};

export const useDropdownActions = ({
    buttonActions,
    restActions,
    visibilityMap,
}: UseDropdownActionsArg) => {
    const actions = [
        ...buttonActions.filter((action) => !visibilityMap[action.id]),
        ...restActions,
    ];
    const groups = groupBy(actions, (action) => action.dropdown.group);

    const usedGroups = new Set<string>();
    const dropdownItems: (DropdownMenuItem | DropdownMenuItem[])[] = [];

    for (const action of actions) {
        const group = action.dropdown.group;
        if (typeof group === 'undefined') {
            dropdownItems.push(action.dropdown.item);
            continue;
        }
        if (usedGroups.has(group)) {
            continue;
        }
        usedGroups.add(group);
        dropdownItems.push(groups[group].map((groupedAction) => groupedAction.dropdown.item));
    }

    return dropdownItems;
};
