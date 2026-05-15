'use client';

import * as React from 'react';

import {Label} from '../Label';
import {MenuItem} from '../lab/Menu';

import {bTab} from './constants';
import {useTab} from './hooks/useTab';
import type {TabComponentElementType, TabProps} from './types';
import {isTabComponentProps, isTabLinkProps} from './utils';

import './Tab.scss';

export const Tab = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TabProps>(function Tab<
    T extends TabComponentElementType,
>(
    props: TabProps<T>,
    ref:
        | React.Ref<HTMLButtonElement>
        | React.Ref<HTMLAnchorElement>
        | React.Ref<T extends string ? React.ComponentRef<T> : T>,
) {
    const tabProps = useTab(props);

    const content = (
        <div className={bTab('content')}>
            {props.icon && <div className={bTab('icon')}>{props.icon}</div>}
            <div className={bTab('title')}>{props.children || props.value}</div>
            {props.counter !== undefined && <div className={bTab('counter')}>{props.counter}</div>}
            {props.label && (
                <Label className={bTab('label')} theme={props.label.theme}>
                    {props.label.content}
                </Label>
            )}
        </div>
    );

    if (isTabComponentProps(props)) {
        return React.createElement(props.component, {
            ...tabProps,
            ref,
            isMenuItem: props.isMenuItem || false,
        });
    }

    if (isTabLinkProps(props)) {
        const rel = props.target === '_blank' && !props.rel ? 'noopener noreferrer' : props.rel;

        if (props.isMenuItem) {
            return (
                <MenuItem
                    {...tabProps}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={props.href}
                    rel={rel}
                >
                    {content}
                </MenuItem>
            );
        }

        return (
            <a {...tabProps} ref={ref as React.Ref<HTMLAnchorElement>} href={props.href} rel={rel}>
                {content}
            </a>
        );
    }

    if (props.isMenuItem) {
        return (
            <MenuItem
                {...tabProps}
                ref={ref as React.Ref<HTMLButtonElement>}
                type={props.type || 'button'}
                disabled={props.disabled}
            >
                {content}
            </MenuItem>
        );
    }

    return (
        <button
            {...tabProps}
            ref={ref as React.Ref<HTMLButtonElement>}
            type={props.type || 'button'}
        >
            {content}
        </button>
    );
});

Tab.displayName = 'Tab';
