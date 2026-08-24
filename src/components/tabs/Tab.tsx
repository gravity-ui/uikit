'use client';

import * as React from 'react';

import {MenuItem} from '../lab/Menu';
import {useDefaultProps} from '../theme/useDefaultProps';
import {getLinkRelWithFallback} from '../utils/getLinkRelWithFallback';
import type {PolymorphicOverloadProps} from '../utils/polymorphic';

import {TabContent} from './TabContent';
import type {TabElementProps} from './hooks/useTab';
import {useTab} from './hooks/useTab';
import type {
    TabButtonProps,
    TabComponentElementType,
    TabComponentProps,
    TabLinkProps,
    TabProps,
} from './types';
import {isTabComponentProps, isTabLinkProps} from './utils';

import './Tab.scss';

export const TabInner = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    TabProps & {isMenuItem?: boolean}
>(function TabInner<T extends TabComponentElementType>(
    rawProps: TabProps<T> & {isMenuItem?: boolean},
    ref:
        | React.Ref<HTMLButtonElement>
        | React.Ref<HTMLAnchorElement>
        | React.Ref<T extends string ? React.ComponentRef<T> : T>,
) {
    const props = useDefaultProps('Tab', rawProps);
    const tabProps = useTab(props);

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
        if (props.isMenuItem) {
            const MenuItemComponent = MenuItem as unknown as React.ForwardRefExoticComponent<
                TabElementProps & {component: Exclude<T, undefined>} & React.RefAttributes<
                        T extends string ? React.ComponentRef<T> : T
                    >
            >;

            return (
                <MenuItemComponent
                    {...tabProps}
                    ref={ref as React.Ref<T extends string ? React.ComponentRef<T> : T>}
                    component={props.component}
                >
                    {content}
                </MenuItemComponent>
            );
        }

        return React.createElement(props.component, {...tabProps, ref}, content);
    }

    if (isTabLinkProps(props)) {
        const rel = getLinkRelWithFallback(props);

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

TabInner.displayName = 'TabInner';

export const Tab = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TabProps>(
    function Tab(rawProps, ref) {
        return <TabInner ref={ref} {...rawProps} />;
    },
) as (<T extends TabComponentElementType, P extends TabProps<T>>(
    props: PolymorphicOverloadProps<
        T,
        P,
        TabComponentProps<Exclude<T, undefined>>,
        TabLinkProps,
        TabButtonProps
    >,
) => React.ReactElement) & {displayName: string};

Tab.displayName = 'Tab';
