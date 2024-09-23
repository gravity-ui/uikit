import React from 'react';

import type {ActionItem} from '../../types';

import {useDropdownActions} from './useDropdownActions';
import {useObserveIntersection} from './useObserveIntersection';

const DEFAULT_MAX_BUTTON_ACTIONS = 4;

export const useCollapseActions = (actions: ActionItem[], maxRowActions?: number) => {
    const maxActions = Math.max(
        0,
        typeof maxRowActions === 'undefined' ? DEFAULT_MAX_BUTTON_ACTIONS : maxRowActions,
    );

    const updateObserveKey = React.useMemo(
        () => actions.map(({id}) => id).join('/') + maxActions,
        [actions, maxActions],
    );

    const [buttonActions, restActions] = React.useMemo(() => {
        const buttonItems: ActionItem[] = [];
        const restItems: ActionItem[] = [];

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

    const showDropdown =
        (Object.keys(visibilityMap).length > 0 || maxActions === 0) && dropdownItems.length > 0;

    return {
        buttonActions,
        dropdownItems,
        parentRef,
        offset: maxActions === 0 ? 0 : offset,
        visibilityMap,
        showDropdown,
    };
};
