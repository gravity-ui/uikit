'use client';

import React from 'react';

import {useLinkProps} from '../lab/router/router';
import type {DOMProps, Href, QAProps, RouterOptions} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';

import './Link.scss';

export type LinkView = 'normal' | 'primary' | 'secondary';

export interface LinkProps extends DOMProps, QAProps {
    view?: LinkView;
    visitable?: boolean;
    underline?: boolean;
    title?: string;
    href: Href;
    target?: string;
    rel?: string;
    id?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
    onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
    routerOptions?: RouterOptions;
}

const b = block('link');

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    {
        view = 'normal',
        visitable,
        underline,
        href,
        target,
        rel,
        title,
        children,
        extraProps,
        onClick,
        onFocus,
        onBlur,
        id,
        style,
        className,
        qa,
        routerOptions,
    },
    ref,
) {
    const handleClickCapture = (event: React.SyntheticEvent) => {
        eventBroker.publish({
            componentId: 'Link',
            eventId: 'click',
            domEvent: event,
        });
    };

    const commonProps = {
        href,
        target,
        rel,
        title,
        onClick,
        onClickCapture: handleClickCapture,
        onFocus,
        onBlur,
        id,
        style,
        className: b({view, visitable, underline}, className),
        'data-qa': qa,
    };

    return (
        <a
            {...extraProps}
            {...commonProps}
            {...useLinkProps({...extraProps, ...commonProps, routerOptions})}
            ref={ref}
        >
            {children}
        </a>
    );
});
