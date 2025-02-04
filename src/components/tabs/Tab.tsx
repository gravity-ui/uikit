'use client';

import * as React from 'react';

import {Label} from '../Label';

import {bTab} from './constants';
import {useTab} from './hooks/useTab';
import type {TabProps} from './types';

import './Tab.scss';

export const Tab = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TabProps>(
    (props, ref) => {
        const tabProps = useTab(props);

        const content = (
            <div className={bTab('content')}>
                {props.icon && <div className={bTab('icon')}>{props.icon}</div>}
                <div className={bTab('title')}>{props.children || props.value}</div>
                {props.counter !== undefined && (
                    <div className={bTab('counter')}>{props.counter}</div>
                )}
                {props.label && (
                    <Label className={bTab('label')} theme={props.label.theme}>
                        {props.label.content}
                    </Label>
                )}
            </div>
        );

        if (props.href) {
            return (
                <a {...tabProps} href={props.href} ref={ref as React.Ref<HTMLAnchorElement>}>
                    {content}
                </a>
            );
        }

        return (
            <button {...tabProps} ref={ref as React.Ref<HTMLButtonElement>}>
                {content}
            </button>
        );
    },
);

Tab.displayName = 'Tab';
