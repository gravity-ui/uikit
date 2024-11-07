'use client';

import React from 'react';

import {useLinkProps} from '../lab/router/router';
import type {DOMProps, Href, QAProps, RouterOptions} from '../types';
import {block} from '../utils/cn';
import {isIcon, isSvg} from '../utils/common';
import {eventBroker} from '../utils/event-broker';
import {isOfType} from '../utils/isOfType';

import {ButtonIcon, getIconSide} from './ButtonIcon';
import type {BUTTON_VIEWS} from './constants';

import './Button.scss';

export type ButtonView = (typeof BUTTON_VIEWS)[number];

export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type ButtonPin =
    | 'round-round'
    | 'brick-brick'
    | 'clear-clear'
    | 'circle-circle'
    | 'round-brick'
    | 'brick-round'
    | 'round-clear'
    | 'clear-round'
    | 'brick-clear'
    | 'clear-brick'
    | 'circle-brick'
    | 'brick-circle'
    | 'circle-clear'
    | 'clear-circle';

export type ButtonWidth = 'auto' | 'max';

export interface ButtonProps extends DOMProps, QAProps {
    /** Button appearance */
    view?: ButtonView;
    size?: ButtonSize;
    pin?: ButtonPin;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    width?: ButtonWidth;
    title?: string;
    tabIndex?: number;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    component?: React.ElementType;
    href?: Href;
    target?: string;
    rel?: string;
    extraProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onFocus?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /** Button content. You can mix button text with `<Icon/>` component */
    children?: React.ReactNode;
    routerOptions?: RouterOptions;
}

const b = block('button');

const ButtonWithHandlers = React.forwardRef<HTMLElement, ButtonProps>(function Button(
    {
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        selected,
        disabled = false,
        loading = false,
        width,
        title,
        tabIndex,
        type = 'button',
        component,
        extraProps,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        children,
        id,
        style,
        className,
        qa,
        ...props
    },
    ref,
) {
    const handleClickCapture = React.useCallback(
        (event: React.SyntheticEvent) => {
            eventBroker.publish({
                componentId: 'Button',
                eventId: 'click',
                domEvent: event,
                meta: {
                    content: event.currentTarget.textContent,
                    view,
                },
            });
        },
        [view],
    );

    const commonProps = {
        title,
        tabIndex,
        onClick,
        onClickCapture: handleClickCapture,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        id,
        style,
        className: b(
            {
                view,
                size,
                pin,
                selected,
                disabled: disabled || loading,
                loading,
                width,
            },
            className,
        ),
        'data-qa': qa,
    };

    const linkProps = useLinkProps({
        ...extraProps,
        ...props,
        onClick: (e) => {
            if (disabled) {
                e.preventDefault();
                return;
            }

            if (typeof onClick === 'function') {
                onClick(e);
            }
        },
    });

    if (component) {
        return React.createElement(
            component,
            {
                ...extraProps,
                ...commonProps,
                ref,
                'aria-disabled': disabled || loading,
            },
            prepareChildren(children),
        );
    }

    if (props.href) {
        return (
            <a
                {...(extraProps as React.ButtonHTMLAttributes<HTMLAnchorElement>)}
                {...commonProps}
                {...linkProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                aria-disabled={disabled || loading}
            >
                {prepareChildren(children)}
            </a>
        );
    }

    return (
        <button
            {...(extraProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            {...commonProps}
            ref={ref as React.Ref<HTMLButtonElement>}
            type={type}
            disabled={disabled || loading}
            aria-pressed={selected}
        >
            {prepareChildren(children)}
        </button>
    );
});

ButtonWithHandlers.displayName = 'Button';

export const Button = Object.assign(ButtonWithHandlers, {Icon: ButtonIcon});

const isButtonIconComponent = isOfType(ButtonIcon);
const isSpan = isOfType<{className?: string}>('span');
const buttonIconClassRe = RegExp(`^${b('icon')}($|\\s+\\w)`);

// eslint-disable-next-line complexity
function prepareChildren(children: React.ReactNode) {
    const items = React.Children.toArray(children);

    if (items.length === 1) {
        const onlyItem = items[0];
        const isButtonIconElement =
            isButtonIconComponent(onlyItem) ||
            (isSpan(onlyItem) && buttonIconClassRe.test(onlyItem.props.className || ''));

        if (isButtonIconElement) {
            return onlyItem;
        } else if (isIcon(onlyItem) || isSvg(onlyItem)) {
            return <Button.Icon key="icon">{onlyItem}</Button.Icon>;
        } else {
            return (
                <span key="text" className={b('text')}>
                    {onlyItem}
                </span>
            );
        }
    } else {
        let startIcon, endIcon, text;
        const content = [];

        for (const item of items) {
            const isIconElement = isIcon(item) || isSvg(item);
            const isButtonIconElement = isButtonIconComponent(item);
            const isRenderedButtonIconElement =
                isSpan(item) && buttonIconClassRe.test(item.props.className || '');

            if (isIconElement || isButtonIconElement || isRenderedButtonIconElement) {
                if (!startIcon && content.length === 0) {
                    const key = 'icon-start';
                    const side = 'start';
                    if (isIconElement) {
                        startIcon = (
                            <Button.Icon key={key} side={side}>
                                {item}
                            </Button.Icon>
                        );
                    } else if (isButtonIconElement) {
                        startIcon = React.cloneElement(item, {
                            side,
                        });
                    } else {
                        startIcon = React.cloneElement(item, {
                            className: b('icon', {side: getIconSide(side)}, item.props.className),
                        });
                    }
                } else if (!endIcon && content.length !== 0) {
                    const key = 'icon-end';
                    const side = 'end';
                    if (isIconElement) {
                        endIcon = (
                            <Button.Icon key={key} side={side}>
                                {item}
                            </Button.Icon>
                        );
                    } else if (isButtonIconElement) {
                        endIcon = React.cloneElement(item, {
                            side,
                        });
                    } else {
                        endIcon = React.cloneElement(item, {
                            className: b('icon', {side: getIconSide(side)}, item.props.className),
                        });
                    }
                }
            } else {
                content.push(item);
            }
        }

        if (content.length > 0) {
            text = (
                <span key="text" className={b('text')}>
                    {content}
                </span>
            );
        }

        return [startIcon, endIcon, text];
    }
}
