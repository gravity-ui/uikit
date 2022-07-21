import React from 'react';
import {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {withEventBrokerDomHandlers} from '../utils/withEventBrokerDomHandlers';

import './Link.scss';

export type LinkView = 'normal' | 'primary' | 'secondary' | 'normal-visitable';

export interface LinkProps extends DOMProps, QAProps {
    view?: LinkView;
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

const PureLink = React.forwardRef<HTMLAnchorElement | HTMLSpanElement, LinkProps>(function Link(
    {
        view = 'normal',
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
    const commonProps = {
        title,
        children,
        onClick,
        onFocus,
        onBlur,
        id,
        style,
        className: b({view}, className),
        'data-qa': qa,
    };

    if (typeof href === 'string') {
        if (target === '_blank' && !rel) {
            rel = 'noopener noreferrer';
        }

        return (
            <a
                {...(extraProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                {...commonProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                target={target}
                rel={rel}
            />
        );
    } else {
        return (
            <span
                {...(extraProps as React.HTMLAttributes<HTMLSpanElement>)}
                {...commonProps}
                ref={ref as React.Ref<HTMLSpanElement>}
                tabIndex={0}
            />
        );
    }
});

PureLink.displayName = 'Link';
export const Link = withEventBrokerDomHandlers(PureLink, ['onClick'], {componentId: 'Link'});
