'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import {Label} from '../Label';
import type {LabelProps} from '../Label';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {filterDOMProps} from '../utils/filterDOMProps';

import {bTabList} from './constants';
import {TabInnerContext} from './contexts/TabInnerContext';
import type {TabTriggerProps} from './types';

export interface TabProps extends AriaLabelingProps, DOMProps, QAProps, TabTriggerProps {
    value: string;
    index?: number;
    title?: string;
    icon?: React.ReactNode;
    counter?: number | string;
    href?: string;
    label?: {
        content: React.ReactNode;
        theme?: LabelProps['theme'];
    };
    disabled?: boolean;
    children?: React.ReactNode;
}

export const Tab = React.forwardRef<HTMLAnchorElement | HTMLDivElement, TabProps>((props, ref) => {
    const {
        value,
        className,
        icon,
        counter,
        label,
        disabled,
        href,
        style,
        children,
        title,
        qa,
        index,
    } = props;

    const {activeTabId, onUpdate, focusedIndex, setFocusedIndex} =
        React.useContext(TabInnerContext);
    const isActive = activeTabId === value;

    const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
        if (disabled) {
            event.preventDefault();
            return;
        }
        onUpdate?.(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === KeyCode.SPACEBAR || event.key === KeyCode.ENTER) {
            onUpdate?.(value);
        }
    };

    const tabIndex = React.useMemo(() => {
        if (disabled) {
            return -1;
        }

        if (focusedIndex === -1 && activeTabId) {
            return activeTabId === value ? 0 : -1;
        } else if (focusedIndex === -1 && !activeTabId) {
            return index === 0 ? 0 : -1;
        } else {
            return focusedIndex === index ? 0 : -1;
        }
    }, [disabled, focusedIndex, index, value, activeTabId]);

    const handleFocus = React.useCallback(() => {
        if (index !== undefined) {
            setFocusedIndex?.(index);
        }
    }, [index, setFocusedIndex]);

    const handleBlur = React.useCallback(() => {
        setFocusedIndex?.(-1);
    }, [setFocusedIndex]);

    const tabProps = {
        'aria-selected': isActive,
        'aria-disabled': disabled === true,
        'aria-controls': props['aria-controls'],
        ...filterDOMProps(props, {labelable: true}),
        role: 'tab',
        style,
        title,
        onClick: handleClick,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        tabIndex,
        id: props.id,
        'data-qa': qa,
        className: bTabList('item', {active: isActive, disabled}, className),
    };

    const content = (
        <div className={bTabList('item-content')}>
            {icon && <div className={bTabList('item-icon')}>{icon}</div>}
            <div className={bTabList('item-title')}>{children || value}</div>
            {counter !== undefined && <div className={bTabList('item-counter')}>{counter}</div>}
            {label && (
                <Label className={bTabList('item-label')} theme={label.theme}>
                    {label.content}
                </Label>
            )}
        </div>
    );

    if (href) {
        return (
            <a {...tabProps} href={href} ref={ref as React.Ref<HTMLAnchorElement>}>
                {content}
            </a>
        );
    }

    return (
        <div {...tabProps} ref={ref as React.Ref<HTMLDivElement>}>
            {content}
        </div>
    );
});

Tab.displayName = 'Tab';
