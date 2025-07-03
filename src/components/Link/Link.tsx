'use client';

import * as React from 'react';

import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';

import './Link.scss';

export type LinkView = 'normal' | 'primary' | 'secondary';

export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'style'>,
        QAProps,
        DOMProps {
    view?: LinkView;
    visitable?: boolean;
    underline?: boolean;
    href: string;
    children?: React.ReactNode;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const b = block('link');

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    {
        view = 'normal',
        visitable = false,
        underline = false,
        href,
        children,
        extraProps,
        qa,
        onClickCapture,
        ...props
    },
    ref,
) {
    const handleClickCapture = React.useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            eventBroker.publish({
                componentId: 'Link',
                eventId: 'click',
                domEvent: event,
            });

            if (onClickCapture) {
                onClickCapture(event);
            }
        },
        [onClickCapture],
    );

    return (
        <a
            {...props}
            {...extraProps}
            ref={ref}
            href={href}
            rel={props.target === '_blank' && !props.rel ? 'noopener noreferrer' : props.rel}
            onClickCapture={handleClickCapture}
            className={b({view, visitable, underline}, props.className)}
            data-qa={qa}
        >
            {children}
        </a>
    );
});
