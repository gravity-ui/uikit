'use client';

import * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';
import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';
import {getLinkRelWithFallback} from '../utils/getLinkRelWithFallback';
import type {PolymorphicComponentProps, PolymorphicCustomElementType} from '../utils/polymorphic';
import {isPolymorphicComponentProps} from '../utils/polymorphic';

import './Link.scss';

export type LinkView = 'normal' | 'primary' | 'secondary';

export interface LinkCommonProps extends QAProps, DOMProps {
    view?: LinkView;
    visitable?: boolean;
    underline?: boolean;
    children?: React.ReactNode;
}

export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'style'>,
        LinkCommonProps {
    component?: never;
    href: string;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export type LinkCustomElementType = PolymorphicCustomElementType;

export type LinkComponentProps<T extends Exclude<LinkCustomElementType, undefined>> =
    PolymorphicComponentProps<LinkCommonProps, T> & {
        /**
         * @deprecated Use additional props at the root
         */
        extraProps?: React.ComponentPropsWithoutRef<T>;
    };

function isLinkComponentProps<T extends LinkCustomElementType>(
    p: LinkProps | LinkComponentProps<Exclude<T, undefined>>,
): p is LinkComponentProps<Exclude<T, undefined>> {
    return isPolymorphicComponentProps<
        LinkProps | LinkComponentProps<Exclude<T, undefined>>,
        LinkComponentProps<Exclude<T, undefined>>
    >(p);
}

const b = block('link');

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link<
    T extends LinkCustomElementType,
>(
    rawProps: LinkProps | LinkComponentProps<Exclude<T, undefined>>,
    ref: React.Ref<HTMLAnchorElement> | React.Ref<T extends string ? React.ComponentRef<T> : T>,
) {
    // default props are declared for the anchor variant, but apply to a custom component as well
    const props = useDefaultProps('Link', rawProps as LinkProps) as typeof rawProps;
    const {
        view = 'normal',
        visitable = false,
        underline = false,
        children,
        extraProps,
        qa,
        onClickCapture,
        // service prop, must not be forwarded to the rendered element via `...rest`
        component: _component,
        ...rest
    } = props;
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
        className: b({view, visitable, underline}, rest.className),
        'data-qa': qa,
    };

    if (isLinkComponentProps(props)) {
        return React.createElement(
            props.component,
            {
                ...rest,
                ...extraProps,
                ...commonProps,
                ref,
            },
            children,
        );
    }

    return (
        <a
            {...(rest as Omit<LinkProps, 'href'>)}
            {...(extraProps as LinkProps['extraProps'])}
            {...commonProps}
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={props.href}
            rel={getLinkRelWithFallback(props)}
        >
            {children}
        </a>
    );
}) as <
    T extends LinkCustomElementType,
    P extends LinkProps | LinkComponentProps<Exclude<T, undefined>>,
>(
    props: P extends {component: Exclude<T, undefined>}
        ? LinkComponentProps<Exclude<T, undefined>> & {
              ref?: React.Ref<T extends string ? React.ComponentRef<T> : T>;
          }
        : LinkProps & {ref?: React.Ref<HTMLAnchorElement>},
) => React.ReactElement;
