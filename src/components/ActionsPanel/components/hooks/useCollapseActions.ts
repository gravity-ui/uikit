'use client';

import * as React from 'react';

import type {ActionsPanelItem} from '../../types';

import {useDropdownActions} from './useDropdownActions';
import {useObserveIntersection} from './useObserveIntersection';

const DEFAULT_MAX_BUTTON_ACTIONS = 4;

export const useCollapseActions = (actions: ActionsPanelItem[], maxRowActions?: number) => {
    const maxActions = Math.max(
        0,
        typeof maxRowActions === 'undefined' ? DEFAULT_MAX_BUTTON_ACTIONS : maxRowActions,
    );

    const allActionsCollapsed = React.useMemo(() => {
        return actions.every((action) => action.collapsed);
    }, [actions]);

    const updateObserveKey = React.useMemo(
        () => actions.map(({id}) => id).join('/') + maxActions,
        [actions, maxActions],
    );

    const [buttonActions, restActions] = React.useMemo(() => {
        const buttonItems: ActionsPanelItem[] = [];
        const restItems: ActionsPanelItem[] = [];

        actions.forEach((action) => {
            if (buttonItems.length < maxActions && !action.collapsed) {
                buttonItems.push(action);
            } else {
                restItems.push(action);
            }
        });

        return [buttonItems, restItems];
    }, [actions, maxActions]);

    const {parentRef, visibilityMap, offset} = useObserveIntersection(updateObserveKey);

    const dropdownItems = useDropdownActions({buttonActions, restActions, visibilityMap});

    const isDefaultOffset = allActionsCollapsed || maxActions === 0;

    const showDropdown =
        (Object.keys(visibilityMap).length > 0 || isDefaultOffset) && dropdownItems.length > 0;

    return {
        buttonActions,
        dropdownItems,
        parentRef,
        offset: isDefaultOffset ? 0 : offset,
        visibilityMap,
        showDropdown,
    };
};
