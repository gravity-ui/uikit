import React from 'react';

import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';

import './Link.scss';

export type LinkView = 'normal' | 'primary' | 'secondary' | 'normal-visitable';

export interface LinkProps extends DOMProps, QAProps {
    /**
     * 'normal-visitable' view is deprecated, use 'visitable' prop instead
     */
    view?: LinkView;
    visitable?: boolean;
    title?: string;
    href?: string;
    target?: string;
    rel?: string;
    id?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    onFocus?: React.FocusEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    onBlur?: React.FocusEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    extraProps?:
        | React.AnchorHTMLAttributes<HTMLAnchorElement>
        | React.HTMLAttributes<HTMLSpanElement>;
}

const b = block('link');

export const Link = React.forwardRef<HTMLElement, LinkProps>(function Link(
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
        children,
        onClick,
        onClickCapture: handleClickCapture,
        onFocus,
        onBlur,
        id,
        style,
        className: b({view, visitable}, className),
        'data-qa': qa,
    };

    if (typeof href === 'string') {
        const relProp = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

        return (
            <a
                {...(extraProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                {...commonProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                target={target}
                rel={relProp}
            >
                {commonProps.children}
            </a>
        );
    } else {
        return (
            <span
                {...(extraProps as React.HTMLAttributes<HTMLSpanElement>)}
                {...commonProps}
                ref={ref as React.Ref<HTMLSpanElement>}
                role="link"
                tabIndex={0}
            />
        );
    }
});
