import * as React from 'react';

import {KeyCode} from '../../../constants';
import {TAB_DATA_ATTRIBUTE, bTab} from '../constants';
import {TabContext} from '../contexts/TabContext';
import type {TabComponentElementType, TabProps} from '../types';

export type TabElementProps = React.HTMLAttributes<HTMLElement> & {
    [key: `data-${string}`]: string | undefined;
    selected: boolean;
};

export function useTab<T extends TabComponentElementType>(tabProps: TabProps<T>): TabElementProps {
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

    const onClick = (event: React.MouseEvent) => {
        if (tabProps.disabled) {
            return;
        }

        if (tabProps.onClick) {
            tabProps.onClick(event);
        }

        if (!event.defaultPrevented) {
            tabContext.onUpdate?.(tabProps.value);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (tabProps.disabled) {
            return;
        }

        if (tabProps.onKeyDown) {
            tabProps.onKeyDown(event);
        }

        if (
            !event.defaultPrevented &&
            (event.key === KeyCode.SPACEBAR || event.key === KeyCode.ENTER)
        ) {
            tabContext.onUpdate?.(tabProps.value);
        }
    };

    const {
        value: _value,
        icon: _icon,
        counter: _counter,
        label: _label,
        disabled: _disabled,
        href: _href,
        component: _component,
        qa: _qa,
        isMenuItem: _isMenuItem,
        ...htmlProps
    } = tabProps;

    const {role: _role, tabIndex: _tabIndex, ...htmlRest} = htmlProps;

    const tabRoleProps = {
        role: 'tab',
        tabIndex: isSelected && !isDisabled && !isFocused ? 0 : -1,
    };

    return {
        ...htmlRest,
        ...(tabProps.isMenuItem ? {} : tabRoleProps),
        'aria-selected': isSelected,
        'aria-disabled': isDisabled,
        'aria-controls': panelId,
        id: tabId,
        onClick,
        onKeyDown,
        className: bTab({active: isSelected, disabled: isDisabled}, tabProps.className),
        'data-qa': tabProps.qa,
        [TAB_DATA_ATTRIBUTE]: tabProps.value,
        selected: isSelected,
    };
}
