import * as React from 'react';

import {KeyCode} from '../../../constants';
import {filterDOMProps} from '../../utils/filterDOMProps';
import {TAB_DATA_ATTRIBUTE, bTab} from '../constants';
import {TabContext} from '../contexts/TabContext';
import {TabListContext} from '../contexts/TabListContext';
import type {TabProps} from '../types';

export function useTab(tabProps: TabProps) {
    const tabContextProps = React.useContext(TabContext);
    const tabListContextProps = React.useContext(TabListContext);

    const currentValue = tabContextProps.value ?? tabListContextProps.value;
    const tabId = `${tabContextProps.id ?? tabListContextProps.id}:t:${tabProps.value}`;
    const panelId = tabContextProps.id ? `${tabContextProps.id}:p:${tabProps.value}` : undefined;

    const isSelected = currentValue === tabProps.value;
    const isDisabled = tabProps.disabled;
    const isFocused = tabListContextProps.isFocused;

    const onClick = () => {
        if (!tabProps.disabled) {
            tabListContextProps.onUpdate?.(tabProps.value);
            tabContextProps.onUpdate?.(tabProps.value);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if ((event.key === KeyCode.SPACEBAR || event.key === KeyCode.ENTER) && !tabProps.disabled) {
            tabListContextProps.onUpdate?.(tabProps.value);
            tabContextProps.onUpdate?.(tabProps.value);
        }
    };

    return {
        ...filterDOMProps(tabProps, {labelable: true}),
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
    };
}
