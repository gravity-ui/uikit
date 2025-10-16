import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useDirection} from '../../theme';
import {TAB_DATA_ATTRIBUTE, bTabList} from '../constants';
import {TabContext} from '../contexts/TabContext';
import type {TabListProps} from '../types';

const getAllTabElements = (tabElement: HTMLElement): HTMLElement[] => {
    return [
        ...(tabElement
            .closest('[role="tablist"]')
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

export function useTabList(
    tabListProps: TabListProps,
): React.HTMLAttributes<HTMLDivElement> & {[key: `data-${string}`]: string | undefined} {
    const tabContext = React.useContext(TabContext);
    const isRTL = useDirection() === 'rtl';

    const activateOnFocus = (tabElement: HTMLElement) => {
        const value = getTabValue(tabElement);

        if (tabListProps.activateOnFocus && value) {
            tabListProps.onUpdate?.(value);
            tabContext?.onUpdate?.(value);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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

        tabListProps.onKeyDown?.(event);
    };

    const {
        value: _value,
        onUpdate: _onUpdate,
        size: _size,
        activateOnFocus: _activateOnFocus,
        qa: _qa,
        ...htmlProps
    } = tabListProps;

    return {
        ...htmlProps,
        role: 'tablist',
        'aria-orientation': 'horizontal' as const,
        onKeyDown,
        className: bTabList({size: tabListProps.size ?? 'm'}, tabListProps.className),
        'data-qa': tabListProps.qa,
    };
}
