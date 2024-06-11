import React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';

import './Link.scss';

export type LinkView = 'normal' | 'primary' | 'secondary';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, QAProps {
    view?: LinkView;
    visitable?: boolean;
    href: string;
    /**
     * @deprecated
     */
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const b = block('link');

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    {
        view = 'normal',
        visitable,
        href,
        target,
        rel: relProp,
        children,
        qa,
        onClickCapture,
        className,
        extraProps,
        ...restProps
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

    const commonProps = {
        onClickCapture: handleClickCapture,
        className: b({view, visitable}, className),
        'data-qa': qa,
    };

    const rel = target === '_blank' && !relProp ? 'noopener noreferrer' : relProp;

    return (
        <a
            {...commonProps}
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            {...restProps}
            {...extraProps}
        >
            {children}
        </a>
    );
});
