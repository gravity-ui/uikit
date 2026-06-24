'use client';

import * as React from 'react';

import {mergeRefs} from '../../hooks/useForkRef';
import {MenuItem} from '../lab/Menu';

import {TabContent} from './TabContent';
import {useTab} from './hooks/useTab';
import type {TabComponentElementType, TabProps} from './types';
import {isTabComponentProps, isTabLinkProps} from './utils';

import './Tab.scss';

type TabRef<T extends TabComponentElementType> =
    | React.Ref<HTMLButtonElement>
    | React.Ref<HTMLAnchorElement>
    | React.Ref<T extends string ? React.ComponentRef<T> : T>;

export const Tab = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TabProps>(function Tab<
    T extends TabComponentElementType,
>(props: TabProps<T>, ref: TabRef<T>) {
    const {provided} = props;
    const tabProps = useTab(props);
    const mergedRef = provided ? mergeRefs(ref as React.Ref<HTMLElement>, provided.innerRef) : ref;

    const content = (
        <TabContent
            icon={props.icon}
            value={props.value}
            counter={props.counter}
            label={props.label}
        >
            {props.children}
        </TabContent>
    );

    if (isTabComponentProps(props)) {
        return React.createElement(props.component, {
            ...tabProps,
            ref: mergedRef,
            isMenuItem: props.isMenuItem || false,
        });
    }

    if (isTabLinkProps(props)) {
        const rel = props.target === '_blank' && !props.rel ? 'noopener noreferrer' : props.rel;

        if (props.isMenuItem) {
            return (
                <MenuItem
                    {...tabProps}
                    ref={mergedRef as React.Ref<HTMLAnchorElement>}
                    href={props.href}
                    rel={rel}
                >
                    {content}
                </MenuItem>
            );
        }

        return (
            <a
                {...tabProps}
                ref={mergedRef as React.Ref<HTMLAnchorElement>}
                href={props.href}
                rel={rel}
            >
                {content}
            </a>
        );
    }

    if (props.isMenuItem) {
        return (
            <MenuItem
                {...tabProps}
                ref={mergedRef as React.Ref<HTMLButtonElement>}
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
            ref={mergedRef as React.Ref<HTMLButtonElement>}
            type={props.type || 'button'}
        >
            {content}
        </button>
    );
});

Tab.displayName = 'Tab';
