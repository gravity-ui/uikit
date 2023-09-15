import React from 'react';

import type {DOMProps, DataAttrProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';

import './Link.scss';

export type LinkView = 'normal' | 'primary' | 'secondary';

export interface LinkProps extends DOMProps, QAProps, DataAttrProps {
    view?: LinkView;
    visitable?: boolean;
    title?: string;
    href: string;
    target?: string;
    rel?: string;
    id?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
    onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const b = block('link');

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    {
        view = 'normal',
        visitable,
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
        ...dataAttrProps
    },
    ref,
) {
    const handleClickCapture = React.useCallback((event: React.SyntheticEvent) => {
        eventBroker.publish({
            componentId: 'Link',
            eventId: 'click',
            domEvent: event,
        });
    }, []);

    const commonProps = {
        title,
        onClick,
        onClickCapture: handleClickCapture,
        onFocus,
        onBlur,
        id,
        style,
        className: b({view, visitable}, className),
        'data-qa': qa,
        ...dataAttrProps,
    };

    const relProp = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

    return (
        <a {...extraProps} {...commonProps} ref={ref} href={href} target={target} rel={relProp}>
            {children}
        </a>
    );
});
