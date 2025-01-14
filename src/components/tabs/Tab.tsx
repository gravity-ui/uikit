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
    const {value, className, icon, counter, label, disabled, href, style, children, title, qa} =
        props;

    const {activeTabId, onUpdate} = React.useContext(TabInnerContext);
    const isActive = activeTabId === value;

    const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
        if (disabled) {
            event.preventDefault();
            return;
        }
        onUpdate?.(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === KeyCode.SPACEBAR) {
            onUpdate?.(value);
        }
    };

    const tabProps = {
        'aria-selected': isActive,
        'aria-disabled': disabled === true,
        'aria-controls': props['aria-controls'],
        ...filterDOMProps(props, {labelable: true}),
        role: 'tab',
        style,
        title,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
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
        <div {...tabProps} tabIndex={disabled ? -1 : 0} ref={ref as React.Ref<HTMLDivElement>}>
            {content}
        </div>
    );
});

Tab.displayName = 'Tab';
