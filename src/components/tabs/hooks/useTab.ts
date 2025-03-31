import * as React from 'react';

import {KeyCode} from '../../../constants';
import {filterDOMProps} from '../../utils/filterDOMProps';
import {TAB_DATA_ATTRIBUTE, bTab} from '../constants';
import {TabContext} from '../contexts/TabContext';
import type {TabProps} from '../types';

export function useTab(tabProps: TabProps) {
    const tabContext = React.useContext(TabContext);

    if (!tabContext) {
        throw new Error('<Tab> must be used within <TabList>');
    }

    const currentValue = tabContext.value;
    const tabId = `${tabContext.id}:t:${tabProps.value}`;
    const panelId = tabContext.isProvider ? `${tabContext.id}:p:${tabProps.value}` : undefined;

    const isSelected = currentValue === tabProps.value;
    const isDisabled = tabProps.disabled;
    const isFocused = tabContext.isFocused;

    const onClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = (event) => {
        if (!tabProps.disabled) {
            tabProps.onClick?.(event);
            tabContext.onUpdate?.(tabProps.value);
        }
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement> = (
        event,
    ) => {
        if ((event.key === KeyCode.SPACEBAR || event.key === KeyCode.ENTER) && !tabProps.disabled) {
            tabProps.onClick?.(event);
            tabContext.onUpdate?.(tabProps.value);
        }
    };

    return {
        role: 'tab',
        'aria-selected': isSelected,
        'aria-disabled': isDisabled,
        'aria-controls': panelId,
        id: tabId,
        tabIndex: isSelected && !isDisabled && !isFocused ? 0 : -1,
        onClick,
        onKeyDown,
        title: tabProps.title,
        style: tabProps.style,
        className: bTab({active: isSelected, disabled: isDisabled}, tabProps.className),
        'data-qa': tabProps.qa,
        [TAB_DATA_ATTRIBUTE]: tabProps.value,
        ...filterDOMProps(tabProps, {labelable: true}),
    };
}
