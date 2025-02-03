import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useDirection} from '../../theme';
import {filterDOMProps} from '../../utils/filterDOMProps';
import {TAB_DATA_ATTRIBUTE, TAB_LIST_DATA_ATTRIBUTE, bTabList} from '../constants';
import {TabContext} from '../contexts/TabContext';
import type {TabListProps} from '../types';

const getAllTabElements = (tabElement: HTMLElement): HTMLElement[] => {
    return [
        ...(tabElement
            .closest(`[${TAB_LIST_DATA_ATTRIBUTE}]`)
            ?.querySelectorAll<HTMLElement>(`[${TAB_DATA_ATTRIBUTE}]`) ?? []),
    ];
};

const isTabDisabled = (tabElement: HTMLElement) => {
    return Boolean(tabElement.getAttribute('aria-disabled'));
};

const getTabValue = (tabElement: HTMLElement) => {
    return tabElement.getAttribute(TAB_DATA_ATTRIBUTE);
};

const focusNearestTab = (
    event: React.KeyboardEvent,
    isInverse: boolean,
    isRTL: boolean,
): HTMLElement => {
    const tabElement = event.target as HTMLElement;
    const allTabElements = getAllTabElements(tabElement);

    const index = allTabElements.indexOf(tabElement);
    let distance = 1;

    while (distance < allTabElements.length) {
        const nextIndex = index + distance * (isRTL ? -1 : 1) * (isInverse ? -1 : 1);
        const nextTabElement = allTabElements.at(nextIndex % allTabElements.length);

        if (nextTabElement && !isTabDisabled(nextTabElement)) {
            nextTabElement.focus();
            return nextTabElement;
        }

        distance++;
    }

    return tabElement;
};

const focusFurthestTab = (event: React.KeyboardEvent, isInverse: boolean): HTMLElement => {
    const tabElement = event.target as HTMLElement;
    const allTabElements = getAllTabElements(tabElement);

    const stopIndex = isInverse ? 0 : allTabElements.length - 1;
    let index = allTabElements.indexOf(tabElement);
    let lastFocusableTabElement = tabElement;

    while (index !== stopIndex) {
        index += isInverse ? -1 : 1;
        const nextTabElement = allTabElements.at(index);

        if (nextTabElement && !isTabDisabled(nextTabElement)) {
            lastFocusableTabElement = nextTabElement;
        }
    }

    lastFocusableTabElement.focus();

    return lastFocusableTabElement;
};

export function useTabList(tabListProps: TabListProps, tabListId: string) {
    const tabContextProps = React.useContext(TabContext);
    const isRTL = useDirection() === 'rtl';

    const currentValue = tabContextProps.value ?? tabListProps.value;
    const parentId = tabContextProps.id ?? tabListId;
    const currentTabId = currentValue ? `${parentId}:t:${currentValue}` : undefined;

    const activateOnFocus = (tabElement: HTMLElement) => {
        const value = getTabValue(tabElement);

        if (tabListProps.activateOnFocus && value) {
            tabListProps.onUpdate?.(value);
            tabContextProps.onUpdate?.(value);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        switch (event.code) {
            case KeyCode.ARROW_LEFT: {
                event.preventDefault();
                activateOnFocus(focusNearestTab(event, true, isRTL));
                break;
            }
            case KeyCode.ARROW_RIGHT: {
                event.preventDefault();
                activateOnFocus(focusNearestTab(event, false, isRTL));
                break;
            }
            case KeyCode.HOME: {
                event.preventDefault();
                activateOnFocus(focusFurthestTab(event, true));
                break;
            }
            case KeyCode.END: {
                event.preventDefault();
                activateOnFocus(focusFurthestTab(event, false));
                break;
            }
        }
    };

    return {
        ...filterDOMProps(tabListProps, {labelable: true}),
        role: 'tablist',
        'aria-orientation': 'horizontal' as const,
        'aria-labelledby': currentTabId,
        onKeyDown,
        style: tabListProps.style,
        className: bTabList({size: tabListProps.size ?? 'm'}, tabListProps.className),
        'data-qa': tabListProps.qa,
        [TAB_LIST_DATA_ATTRIBUTE]: '',
    };
}
